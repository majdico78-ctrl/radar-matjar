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
var matjar_phone_exports = {};
__export(matjar_phone_exports, {
  GET: () => GET,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_phone_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "رقم صاحب الدكان — يُدخل ويُغيَّر من اللوحة، وعليه الاستعادة ورسائل الطلبيات";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const DEF = "";
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-phone.json");
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : {};
const save = (req, x) => {
  (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
  (0, import_node_fs.writeFileSync)(FILE(req), JSON.stringify(x, null, 2));
};
function GET(req) {
  let v = load(req);
  if (!v.phone) {
    v = { phone: DEF };
    save(v);
  }
  return Response.json({ phone: v.phone });
}
async function POST(req) {
  try {
    const { phone, code } = await req.json();
    const secret = "9178";
    if (String(code || "").trim() !== secret)
      return Response.json({ error: "الرقم السري غلط أو ناقص" }, { status: 403 });
    const p = String(phone || "").replace(/\D/g, "");
    if (!/^(07\d{8}|9627\d{8})$/.test(p))
      return Response.json({ error: "رقم أردني غير صالح — صيغته 07XXXXXXXX" }, { status: 400 });
    const clean = p.startsWith("962") ? "0" + p.slice(3) : p;
    save(req, { phone: clean });
    return Response.json({ ok: true, phone: clean });
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
