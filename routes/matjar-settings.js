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
var matjar_settings_exports = {};
__export(matjar_settings_exports, {
  GET: () => GET,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_settings_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "إعدادات المتجر — اللافتة العلوية للرئيسية (رفع من صاحب المتجر)";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-settings.json");
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : {};
function GET(req) {
  const u = new URL(req.url);
  const key = u.searchParams.get("key") || "";
  const all = load(req);
  return Response.json({ key, value: key in all ? all[key] : void 0 });
}
async function POST(req) {
  try {
    const b = await req.json();
    const key = String(b.key || "").replace(/[^a-z0-9-]/gi, "");
    if (!key) return Response.json({ error: "حدد المفتاح" }, { status: 400 });
    let value = b.value === null ? null : String(b.value);
    if (value && value.length > 2e6) return Response.json({ error: "الصورة كبيرة — خففها وأعد المحاولة" }, { status: 413 });
    const all = load(req);
    if (value === null) delete all[key];
    else all[key] = value;
    (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
    (0, import_node_fs.writeFileSync)(FILE(req), JSON.stringify(all, null, 2));
    return Response.json({ ok: true });
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
