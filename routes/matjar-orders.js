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
var matjar_orders_exports = {};
__export(matjar_orders_exports, {
  DELETE: () => DELETE,
  GET: () => GET,
  PATCH: () => PATCH,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_orders_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var import_matjar_delivered = require("./matjar-delivered");
const description = "طلبات متجر محمد الأقطش للمجمدات — تخزين ملف دائم";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-orders.json");
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : [];
const save = (req, x) => {
  (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
  (0, import_node_fs.writeFileSync)(FILE(req), JSON.stringify(x, null, 2));
};
function GET(req) {
  return Response.json(load(req));
}
async function POST(req) {
  try {
    const body = await req.json();
    const order = { id: "o" + Date.now(), ...body };
    if (typeof order.total !== "number")
      order.total = (order.items || []).reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
    const all = load(req);
    all.unshift(order);
    save(req, all);
    return Response.json(order, { status: 201 });
  } catch (e) {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
async function PATCH(req) {
  try {
    const { id, status, fee, total } = await req.json();
    if (!id || !status) return Response.json({ error: "id وstatus مطلوبان" }, { status: 400 });
    const all = load(req);
    const o = all.find((x) => x.id === id);
    if (!o) return Response.json({ error: "الطلب غير موجود" }, { status: 404 });
    o.status = status;
    if (typeof fee === "number") o.fee = fee;
    if (typeof total === "number") o.total = total;
    save(req, all);
    if (["تم الاستلام", "سُلّمت"].includes(status)) (0, import_matjar_delivered.archiveOrder)(req, o);
    return Response.json(o);
  } catch (e) {
    return Response.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
async function DELETE(req) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id مطلوب" }, { status: 400 });
  save(req, load(req).filter((o) => o.id !== id));
  return Response.json({ ok: true });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DELETE,
  GET,
  PATCH,
  POST,
  description
});
