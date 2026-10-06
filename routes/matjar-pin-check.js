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
var matjar_pin_check_exports = {};
__export(matjar_pin_check_exports, {
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_pin_check_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "التحقق من رمز الدكان — يقارن ويرجع صح/خطأ فقط، الرمز لا يُعطى لأحد";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const DEFAULT_PIN = "1234";
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-pin.json");
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : { pin: DEFAULT_PIN };
async function POST(req) {
  try {
    const { pin } = await req.json();
    const ok = String(pin || "").trim() === load(req).pin;
    return Response.json({ ok });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  POST,
  description
});
