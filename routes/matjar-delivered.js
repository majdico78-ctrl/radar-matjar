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
var matjar_delivered_exports = {};
__export(matjar_delivered_exports, {
  GET: () => GET,
  ammanDay: () => ammanDay,
  archiveOrder: () => archiveOrder,
  description: () => description
});
module.exports = __toCommonJS(matjar_delivered_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "أرشيف يومي للطلبيات المسلَّمة — ملف دائم مفروز بتاريخ التسليم";
const BASE = (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data");
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const ARC = (req) => (0, import_node_path.join)(SD(req), "matjar-delivered.json");
const ORD = (req) => (0, import_node_path.join)(SD(req), "matjar-orders.json");
const loadArc = (req) => (0, import_node_fs.existsSync)(ARC(req)) ? JSON.parse((0, import_node_fs.readFileSync)(ARC(req), "utf-8")) : {};
const saveArc = (req, a) => {
  (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
  (0, import_node_fs.writeFileSync)(ARC(req), JSON.stringify(a, null, 2));
};
function ammanDay(d = /* @__PURE__ */ new Date()) {
  return new Date(d.getTime() + 3 * 3600 * 1e3).toISOString().slice(0, 10);
}
function dayFromAt(at) {
  if (!at) return null;
  const digits = "٠١٢٣٤٥٦٧٨٩";
  const lat = at.replace(/[\u200e\u200f]/g, "").replace(/[٠-٩]/g, (c) => String(digits.indexOf(c)));
  const m = lat.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}
function archiveOrder(req, o, day) {
  const a = loadArc(req);
  const k = day || ammanDay();
  if (!a[k]) a[k] = [];
  if (!a[k].some((x) => x.id === o.id)) {
    a[k].unshift({ ...o, deliveredAt: (/* @__PURE__ */ new Date()).toISOString(), deliveredDay: k });
    saveArc(req, a);
  }
}
function GET(req) {
  const a = loadArc(req);
  if ((0, import_node_fs.existsSync)(ORD(req))) {
    const orders = JSON.parse((0, import_node_fs.readFileSync)(ORD(req), "utf-8"));
    const done = orders.filter((o) => ["تم الاستلام", "سُلّمت"].includes(o.status || ""));
    let changed = false;
    for (const o of done) {
      const all = Object.values(a).flat();
      if (!all.some((x) => x.id === o.id)) {
        const k = dayFromAt(o.at) || ammanDay();
        if (!a[k]) a[k] = [];
        a[k].unshift({ ...o, deliveredDay: k });
        changed = true;
      }
    }
    if (changed) saveArc(req, a);
  }
  return Response.json(a);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  ammanDay,
  archiveOrder,
  description
});
