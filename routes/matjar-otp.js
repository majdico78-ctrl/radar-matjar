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
var matjar_otp_exports = {};
__export(matjar_otp_exports, {
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_otp_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "نسيت رمز الدخول — كود تحقق لرقم هاتف صاحب المتجر (صالح ١٠ دقائق)";
const BASE = (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data");
const norm = (s) => String(s || "").trim().replace(/\s+/g, " ").toLowerCase();
const findStore = (name) => {
  const f = (0, import_node_path.join)(BASE, "matjar-stores.json");
  const stores = (0, import_node_fs.existsSync)(f) ? JSON.parse((0, import_node_fs.readFileSync)(f, "utf-8")) : [];
  return stores.find((s) => norm(s.name) === norm(name));
};
const OTPF = (sid) => (0, import_node_path.join)(BASE, "stores", String(sid).replace(/[^a-z0-9-]/gi, ""), "matjar-otp.json");
async function POST(req) {
  try {
    const b = await req.json();
    const ph = String(b.phone || "").replace(/\D/g, "");
    const s = findStore(String(b.name || ""));
    if (!s) return Response.json({ error: "الاسم أو الهاتف غلط" }, { status: 403 });
    if (s.phone && String(s.phone).replace(/\D/g, "") !== ph)
      return Response.json({ error: "الاسم أو الهاتف غلط" }, { status: 403 });
    if (b.action === "request") {
      const code = String(Math.floor(1e3 + Math.random() * 9e3));
      (0, import_node_fs.mkdirSync)((0, import_node_path.join)(BASE, "stores", String(s.id).replace(/[^a-z0-9-]/gi, "")), { recursive: true });
      (0, import_node_fs.writeFileSync)(OTPF(s.id), JSON.stringify({ code, exp: Date.now() + 10 * 6e4 }));
      return Response.json({ ok: true, sent: true, demoCode: code, note: "وضع تجربة" });
    }
    if (b.action === "verify") {
      if (!(0, import_node_fs.existsSync)(OTPF(s.id))) return Response.json({ error: "اطلب الكود أولاً" }, { status: 400 });
      const otp = JSON.parse((0, import_node_fs.readFileSync)(OTPF(s.id), "utf-8"));
      if (Date.now() > otp.exp) return Response.json({ error: "انتهت صلاحية الكود — اطلب غيره" }, { status: 400 });
      if (String(b.code).trim() !== otp.code) return Response.json({ error: "الكود غلط" }, { status: 403 });
      (0, import_node_fs.writeFileSync)(OTPF(s.id), JSON.stringify({ code: "", exp: 0 }));
      return Response.json({ ok: true, store: { id: s.id, name: s.name } });
    }
    return Response.json({ error: "طلب غير معروف" }, { status: 400 });
  } catch {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  POST,
  description
});
