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
var matjar_store_login_exports = {};
__export(matjar_store_login_exports, {
  GET: () => GET,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_store_login_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "دخول صاحب متجر — اسم المتجر + رمز الدخول · GET حالة التجربة";
const BASE = (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data");
const TRIAL_DAYS = 14;
const norm = (s) => String(s || "").trim().replace(/\s+/g, " ").toLowerCase();
function GET(req) {
  const u = new URL(req.url);
  const qname = u.searchParams.get("name");
  if (qname) {
    try {
      const stores = (0, import_node_fs.existsSync)((0, import_node_path.join)(BASE, "matjar-stores.json")) ? JSON.parse((0, import_node_fs.readFileSync)((0, import_node_path.join)(BASE, "matjar-stores.json"), "utf-8")) : [];
      const n = norm(qname);
      const s = stores.find((x) => norm(x.name) === n);
      return Response.json({ ok: true, exists: !!s, hasPhone: !!(s && s.phone) });
    } catch {
      return Response.json({ ok: true, exists: false, hasPhone: false });
    }
  }
  const id = String(u.searchParams.get("store") || "").replace(/[^a-z0-9-]/gi, "");
  if (!id) return Response.json({ error: "حدد المتجر" }, { status: 400 });
  try {
    const stores = (0, import_node_fs.existsSync)((0, import_node_path.join)(BASE, "matjar-stores.json")) ? JSON.parse((0, import_node_fs.readFileSync)((0, import_node_path.join)(BASE, "matjar-stores.json"), "utf-8")) : [];
    const s = stores.find((x) => x.id === id);
    if (!s) return Response.json({ error: "لا يوجد متجر" }, { status: 404 });
    const created = new Date(s.createdAt).getTime() || Date.now();
    const trialEnds = new Date(created + TRIAL_DAYS * 864e5);
    const daysLeft = Math.max(0, Math.ceil((trialEnds.getTime() - Date.now()) / 864e5));
    return Response.json({ ok: true, name: s.name, trialDays: TRIAL_DAYS, daysLeft, trialEnds: trialEnds.toISOString(), expired: daysLeft <= 0 });
  } catch {
    return Response.json({ error: "خطأ" }, { status: 500 });
  }
}
async function POST(req) {
  try {
    const { name, pin, phone } = await req.json();
    const n = norm(name);
    const p = String(pin || "").trim();
    const ph = String(phone || "").replace(/\D/g, "");
    if (!n || !p) return Response.json({ error: "اكتب اسم المتجر ورمز الدخول" }, { status: 400 });
    const stores = (0, import_node_fs.existsSync)((0, import_node_path.join)(BASE, "matjar-stores.json")) ? JSON.parse((0, import_node_fs.readFileSync)((0, import_node_path.join)(BASE, "matjar-stores.json"), "utf-8")) : [];
    for (const s of stores) {
      if (norm(s.name) !== n) continue;
      const pf = (0, import_node_path.join)(BASE, "stores", String(s.id).replace(/[^a-z0-9-]/gi, ""), "matjar-pin.json");
      let storePin = "1234";
      try {
        const v = JSON.parse((0, import_node_fs.readFileSync)(pf, "utf-8"));
        if (v && v.pin) storePin = v.pin;
      } catch {
      }
      if (p !== storePin) return Response.json({ error: "الاسم أو الرمز غلط" }, { status: 403 });
      if (s.blocked) return Response.json({ error: "توقفت الخدمة عن متجرك — لم يتم الدفع. تواصل مع إدارة المنصة", blocked: true }, { status: 423 });
      return Response.json({ ok: true, store: { id: s.id, name: s.name, cat: s.cat || void 0 } });
    }
    return Response.json({ error: "الاسم أو الرمز غلط" }, { status: 403 });
  } catch {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  POST,
  description
});
