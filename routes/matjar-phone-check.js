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
var matjar_phone_check_exports = {};
__export(matjar_phone_check_exports, {
  POST: () => POST,
  description: () => description
});
module.exports = __toCommonJS(matjar_phone_check_exports);
const description = "التحقق من الرقم السري لخانة رقم صاحب الدكان — يقارن ويرجع صح/خطأ فقط";
const PHONE_SECRET = "9178";
async function POST(req) {
  try {
    const { code } = await req.json();
    const ok = String(code || "").trim() === PHONE_SECRET;
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
