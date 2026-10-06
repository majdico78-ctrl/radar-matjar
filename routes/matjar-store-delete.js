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
var matjar_store_delete_exports = {};
__export(matjar_store_delete_exports, {
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_store_delete_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "إمسح متجر — لصاحب المنصة برمز المنصة (من قائمة إدارة المنصة)";
const MASTER_CODE = "9178";
const BASE = (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data");
const FILE = (0, import_node_path.join)(BASE, "matjar-stores.json");
async function POST(req) {
  try {
    const { id, code } = await req.json();
    if (String(code || "").trim() !== MASTER_CODE)
      return Response.json({ error: "رمز المنصة غلط" }, { status: 403 });
    const sid = String(id || "").replace(/[^a-z0-9-]/gi, "");
    if (!sid || sid === "aqtash") return Response.json({ error: "المتجر محمي أو المعرف ناقص" }, { status: 400 });
    const all = (0, import_node_fs.existsSync)(FILE) ? JSON.parse((0, import_node_fs.readFileSync)(FILE, "utf-8")) : [];
    if (!all.some((s) => s.id === sid)) return Response.json({ error: "لا يوجد متجر بهذا المعرّف" }, { status: 404 });
    (0, import_node_fs.writeFileSync)(FILE, JSON.stringify(all.filter((s) => s.id !== sid), null, 2));
    (0, import_node_fs.rmSync)((0, import_node_path.join)(BASE, "stores", sid), { recursive: true, force: true });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  POST,
  description
});
