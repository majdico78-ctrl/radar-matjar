var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var matjar_wallet_exports = {};
__export(matjar_wallet_exports, {
  GET: () => GET,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_wallet_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "أرصدة الزبائن — GET ?phone= أو الكل، POST {phone,name,amount,note,kind}";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-wallet.json");
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : [];
const save = (req, x) => {
  (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
  (0, import_node_fs.writeFileSync)(FILE(req), JSON.stringify(x, null, 2));
};
const normPhone = (p) => (p || "").replace(/\D/g, "");
function GET(req) {
  const u = new URL(req.url);
  const ph = normPhone(u.searchParams.get("phone") || "");
  const all = load(req);
  if (ph) {
    const rows = all.filter((r) => normPhone(r.phone) === ph);
    const balance = rows.reduce((s, r) => s + (r.kind === "شحن" ? r.amount : -r.amount), 0);
    return Response.json({ phone: ph, balance, history: rows.reverse() });
  }
  const map = {};
  for (const r of all) {
    const k = normPhone(r.phone);
    if (!k) continue;
    if (!map[k]) map[k] = { name: r.name || "", balance: 0, count: 0 };
    map[k].balance += r.kind === "شحن" ? r.amount : -r.amount;
    map[k].count++;
    if (r.name) map[k].name = r.name;
  }
  return Response.json(Object.entries(map).map(([phone, v]) => ({ phone, ...v })));
}
async function POST(req) {
  const b = await req.json().catch(() => null);
  const phone = normPhone(b?.phone || "");
  const amount = Math.round(Number(b?.amount) * 100) / 100;
  const kind = b?.kind === "خصم" ? "خصم" : "شحن";
  if (!/^07\d{8}$/.test(phone)) return Response.json({ error: "رقم موبايل غير صالح" }, { status: 400 });
  if (!amount || amount <= 0) return Response.json({ error: "مبلغ غير صالح" }, { status: 400 });
  const row = { id: "w" + Date.now(), phone, name: (b?.name || "").trim(), amount, kind, note: (b?.note || "").trim(), at: (/* @__PURE__ */ new Date()).toLocaleString("ar-JO") };
  const all = load(req);
  all.push(row);
  save(req, all);
  return Response.json(row, { status: 201 });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  POST,
  description
});
