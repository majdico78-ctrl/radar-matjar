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
var matjar_pin_exports = {};
__export(matjar_pin_exports, {
  GET: () => GET,
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_pin_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "رمز دخول الموظف — يُستعاد أو يُغيَّر برقم المحل";
const SD = (req) => {
  const sid = String((req?.headers?.get ? req.headers.get("x-matjar-store") : "") || "main").replace(/[^a-zA-Z0-9-]/g, "");
  return (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "stores", sid || "main");
};
const DEFAULT_PIN = "1234";
const FILE = (req) => (0, import_node_path.join)(SD(req), "matjar-pin.json");
const ownerPhone = (req) => {
  try {
    return JSON.parse((0, import_node_fs.readFileSync)((0, import_node_path.join)(SD(req), "matjar-phone.json"), "utf-8")).phone || "";
  } catch {
    return "";
  }
};
const load = (req) => (0, import_node_fs.existsSync)(FILE(req)) ? JSON.parse((0, import_node_fs.readFileSync)(FILE(req), "utf-8")) : {};
const save = (req, x) => {
  (0, import_node_fs.mkdirSync)(SD(req), { recursive: true });
  (0, import_node_fs.writeFileSync)(FILE(req), JSON.stringify(x, null, 2));
};
function GET(req) {
  let v = load(req);
  if (!v.pin) {
    v = { pin: DEFAULT_PIN };
    save(req, v);
  }
  const phone = req ? new URL(req.url).searchParams.get("phone") || "" : "";
  if (!phone) return Response.json({ error: "الرمز سري — التحقق من /v1/x/matjar-pin-check والاستعادة برقم المحل" }, { status: 403 });
  {
    const cur = ownerPhone(req);
    if (!cur) return Response.json({ error: "ما في رقم محفوظ للدكان — يُدخل من اللوحة بـ 📞 رقم الدكان" }, { status: 403 });
    const clean = phone.replace(/\D/g, "");
    if (clean === cur || clean === cur.replace(/^0/, "962")) return Response.json({ pin: v.pin });
    return Response.json({ error: "الرقم ما هو رقم صاحب الدكان" }, { status: 403 });
  }
}
async function POST(req) {
  try {
    const { phone, currentPin, newPin } = await req.json();
    const cur = ownerPhone(req);
    const clean = (phone || "").replace(/\D/g, "");
    const curPin = String(currentPin || "").trim();
    const byPhone = cur && (clean === cur || clean === cur.replace(/^0/, "962"));
    if (!byPhone && !(curPin && curPin === load(req).pin))
      return Response.json({ error: "أكّد هويتك: رقم صاحب الدكان أو كلمة السر الحالية" }, { status: 403 });
    const pin = String(newPin || "").trim();
    if (pin.length < 4 || pin.length > 30) return Response.json({ error: "كلمة السر من ٤ إلى ٣٠ محرفاً — حروف وأرقام ورموز كما تحب" }, { status: 400 });
    save(req, { pin });
    return Response.json({ ok: true, pin });
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
