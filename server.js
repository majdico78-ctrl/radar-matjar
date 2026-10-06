/*
  منصة المتاجر — الخادم المستقل
  يقدّم واجهة المتجر (مجلد public) وكل مسارات البيانات تحت /v1/x/matjar-*
  صفحة إدارة المنصة: الرابط + #admin (رمز المنصة 9178)
  البيانات بملفات JSON داخل مجلد data (نُقلت بيانات المتاجر الحية إليه).
*/
const express = require("express");
const fs = require("fs");
const path = require("path");

process.env.VELLUM_WORKSPACE_DIR = __dirname; // المسارات تقرأ بياناتها من data هنا

const app = express();
// جسم الطلب الخام — المسارات تقرأه بنفسها بـ req.json()
app.use("/v1/x/", express.raw({ type: "*/*", limit: "35mb" }));
app.use(express.json({ limit: "35mb" }));

/* ---------- جسر المسارات: ملفات المسارات القياسية (Request/Response) ---------- */
const ROUTES = path.join(__dirname, "routes");
const cache = {};
function routeMod(name) {
  const file = path.join(ROUTES, String(name).replace(/[^a-z0-9-]/gi, "") + ".js");
  if (!fs.existsSync(file)) return null;
  if (!cache[name]) { delete require.cache[require.resolve(file)]; try { cache[name] = require(file); } catch (e) { console.error("route", name, e.message); return null; } }
  return cache[name];
}
app.all("/v1/x/:name", async (req, res) => {
  const mod = routeMod(req.params.name);
  const fn = mod && mod[req.method.toUpperCase()];
  if (!fn) return res.status(404).json({ error: "لا يوجد مسار" });
  try {
    const url = "http://" + (req.headers.host || "local") + req.originalUrl;
    const hasBody = !["GET", "HEAD"].includes(req.method.toUpperCase());
    const r = new Request(url, {
      method: req.method,
      headers: { "content-type": "application/json", ...req.headers },
      body: hasBody && req.body && req.body.length ? req.body : undefined,
    });
    // ترويسة المتجر الحالي — العزل بين المتاجر
    Object.defineProperty(r, "headers", { value: new Headers({ ...req.headers }) });
    const out = await fn(r);
    res.status(out.status);
    out.headers.forEach((v, k) => { try { res.setHeader(k, v); } catch (e) {} });
    const buf = Buffer.from(await out.arrayBuffer());
    res.send(buf);
  } catch (e) {
    console.error("route error", req.params.name, e.message);
    res.status(500).json({ error: "خطأ داخلي" });
  }
});

/* ---------- الواجهة: نسخة الموقع + حقن جسر vellum ---------- */
const PUBLIC = path.join(__dirname, "public");
const INDEX = (() => {
  let html = fs.readFileSync(path.join(PUBLIC, "index.html"), "utf-8");
  const shim = `<script>
window.vellum = {
  fetch: (url, opts) => fetch(url, opts),
  asset: (p) => fetch(p).then(r => r.blob()),
  notify: (m) => console.log("notify:", m)
};
</script>`;
  html = html.replace("<body>", "<body>" + shim);
  return html;
})();

app.get("/", (req, res) => { res.set("Content-Type", "text/html; charset=utf-8"); res.set("Cache-Control", "no-cache"); res.send(INDEX); });
app.use(express.static(PUBLIC, { index: false, maxAge: "1h" }));
// أي مسار غير معروف يرجع للواجهة (روابط مباشرة و#admin)
app.use((req, res) => { res.set("Content-Type", "text/html; charset=utf-8"); res.send(INDEX); });

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`منصة المتاجر تعمل على المنفذ ${PORT}`));
