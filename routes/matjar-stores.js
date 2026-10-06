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
var matjar_stores_exports = {};
__export(matjar_stores_exports, {
  DELETE: () => DELETE,
  GET: () => GET,
  PATCH: () => PATCH,
  POST: () => POST,
  TRIAL_DAYS: () => TRIAL_DAYS,
  description: () => description
});
module.exports = __toCommonJS(matjar_stores_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "سجلّ المتاجر — POST تسجيل مفتوح (تجربة مجانية) · DELETE إغلاق (برمز المنصة)";
const MASTER_CODE = "9178";
const TRIAL_DAYS = 14;
const BASE = (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data");
const FILE = (0, import_node_path.join)(BASE, "matjar-stores.json");
const load = () => (0, import_node_fs.existsSync)(FILE) ? JSON.parse((0, import_node_fs.readFileSync)(FILE, "utf-8")) : [];
const save = (v) => {
  (0, import_node_fs.mkdirSync)(BASE, { recursive: true });
  (0, import_node_fs.writeFileSync)(FILE, JSON.stringify(v, null, 2));
};
const storeStatus = (st) => {
  const now = Date.now();
  const paidUntil = st.paidUntil ? new Date(st.paidUntil).getTime() : 0;
  if (paidUntil > now) return { status: "مدفوع", paidUntil: st.paidUntil };
  const created = new Date(st.createdAt).getTime() || now;
  const daysLeft = Math.max(0, Math.ceil((created + TRIAL_DAYS * 864e5 - now) / 864e5));
  return daysLeft > 0 ? { status: "تجربة", daysLeft } : { status: "منتهٍ", daysLeft: 0 };
};
function GET(req) {
  const u = new URL(req.url);
  if (String(u.searchParams.get("code") || "").trim() !== MASTER_CODE)
    return Response.json({ error: "قائمة المتاجر خاصة" }, { status: 403 });
  return Response.json(load().map((st) => ({ ...st, ...storeStatus(st) })));
}
async function PATCH(req) {
  try {
    const b = await req.json();
    if (String(b.code || "").trim() !== MASTER_CODE)
      return Response.json({ error: "رمز المنصة غلط" }, { status: 403 });
    const all = load();
    const st = all.find((x) => x.id === String(b.id || ""));
    if (!st) return Response.json({ error: "لا يوجد متجر" }, { status: 404 });
    if (b.blocked !== void 0) {
      st.blocked = !!b.blocked;
      save(all);
      return Response.json({ ok: true, store: { ...st, ...storeStatus(st) } });
    }
    const months = Math.max(1, Math.min(24, Number(b.months) || 1));
    const cur = st.paidUntil ? new Date(st.paidUntil).getTime() : 0;
    const base = Math.max(Date.now(), cur);
    st.paidUntil = new Date(base + months * 30 * 864e5).toISOString();
    save(all);
    return Response.json({ ok: true, store: { ...st, ...storeStatus(st) } });
  } catch {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
async function POST(req) {
  try {
    const b = await req.json();
    const name = String(b.name || "").trim();
    if (!name || name.length > 60)
      return Response.json({ error: "اكتب اسم المتجر (حتى ٦٠ حرفاً)" }, { status: 400 });
    let id = String(b.id || "").trim().toLowerCase().replace(/\s+/g, "-");
    if (!id) id = "s" + Date.now().toString(36);
    if (!/^[a-z0-9][a-z0-9-]{1,23}$/.test(id))
      return Response.json({ error: "معرّف المتجر: حروف إنكليزية صغيرة وأرقام وشرطة فقط (٢–٢٤ محرفاً)" }, { status: 400 });
    if (load().some((s) => s.id === id))
      return Response.json({ error: "المعرّف مستعمل — اختر غيره" }, { status: 400 });
    const cat = String(b.cat || "").trim().slice(0, 40) || void 0;
    const phone = /^07\d{8}$/.test(String(b.phone || "").trim()) ? String(b.phone).trim() : void 0;
    if (b.phone && !phone) return Response.json({ error: "رقم الهاتف: ١٠ أرقام وتبدأ بـ07" }, { status: 400 });
    const store = { id, name, cat, phone, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    save([...load(), store]);
    const pin = String(b.pin || "").trim();
    if (pin) {
      if (pin.length < 4 || pin.length > 30)
        return Response.json({ error: "كلمة السر من ٤ إلى ٣٠ محرفاً — حروف وأرقام ورموز كما تحب" }, { status: 400 });
      try {
        (0, import_node_fs.mkdirSync)((0, import_node_path.join)(BASE, "stores", id), { recursive: true });
        (0, import_node_fs.writeFileSync)((0, import_node_path.join)(BASE, "stores", id, "matjar-pin.json"), JSON.stringify({ pin }, null, 2));
      } catch {
      }
    }
    return Response.json({ ok: true, store }, { status: 201 });
  } catch {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
async function DELETE(req) {
  try {
    const u = new URL(req.url);
    if (String(u.searchParams.get("code") || "").trim() !== MASTER_CODE)
      return Response.json({ error: "رمز المنصة غلط أو ناقص" }, { status: 403 });
    const id = u.searchParams.get("id") || "";
    const all = load();
    if (!all.some((s) => s.id === id)) return Response.json({ error: "لا يوجد متجر بهذا المعرّف" }, { status: 404 });
    save(all.filter((s) => s.id !== id));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DELETE,
  GET,
  PATCH,
  POST,
  TRIAL_DAYS,
  description
});
