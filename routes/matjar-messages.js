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
var matjar_messages_exports = {};
__export(matjar_messages_exports, {
  GET: () => GET,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_messages_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "رسائل الزبائن — GET الكل أو ?orderId=، POST {orderId,phone,text,total}";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-messages.json");
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : [];
const save = (req, x) => {
  (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
  (0, import_node_fs.writeFileSync)(FILE(req), JSON.stringify(x, null, 2));
};
function GET(req) {
  const u = new URL(req.url);
  const oid = u.searchParams.get("orderId") || "";
  const all = load(req);
  return Response.json(oid ? all.filter((m) => m.orderId === oid) : all);
}
async function POST(req) {
  const b = await req.json().catch(() => null);
  if (!b || !b.orderId || !b.text) return Response.json({ error: "orderId و text مطلوبان" }, { status: 400 });
  const msg = {
    id: "m" + Date.now(),
    orderId: b.orderId,
    phone: (b.phone || "").replace(/\D/g, "") || void 0,
    text: String(b.text),
    total: Number(b.total) || void 0,
    at: (/* @__PURE__ */ new Date()).toLocaleString("ar-JO")
  };
  const all = load(req);
  all.push(msg);
  save(req, all);
  return Response.json(msg, { status: 201 });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  POST,
  description
});
