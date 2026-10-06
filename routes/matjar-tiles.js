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
var matjar_tiles_exports = {};
__export(matjar_tiles_exports, {
  GET: () => GET,
  description: () => description
});
module.exports = __toCommonJS(matjar_tiles_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
const description = "بلاطات الخارطة — جوجل (قمر صناعي/شوارع) وOSM كاحتياط — مع سجل مراقبة";
const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36";
const LOG = (0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data", "matjar-tiles.log");
function log(m) {
  try {
    (0, import_node_fs.mkdirSync)((0, import_node_path.join)(process.env.VELLUM_WORKSPACE_DIR, "data"), { recursive: true });
    (0, import_node_fs.appendFileSync)(LOG, `${(/* @__PURE__ */ new Date()).toISOString()} ${m}
`);
  } catch (e) {
  }
}
const mem = /* @__PURE__ */ new Map();
async function grab(url, headers) {
  const r = await fetch(url, { headers, signal: AbortSignal.timeout(9e3) });
  if (!r.ok) throw r.status;
  return { buf: await r.arrayBuffer(), ct: r.headers.get("content-type") || "image/jpeg" };
}
async function GET(req) {
  const u = new URL(req.url);
  const z = Math.max(0, Math.min(20, parseInt(u.searchParams.get("z") || "16") || 16));
  const n = Math.pow(2, z);
  const x = Math.max(0, Math.min(n - 1, parseInt(u.searchParams.get("x") || "0") || 0));
  const y = Math.max(0, Math.min(n - 1, parseInt(u.searchParams.get("y") || "0") || 0));
  const s = u.searchParams.get("s") === "m" ? "m" : "g";
  const fmt = u.searchParams.get("fmt") === "b64" ? "b64" : "bin";
  const key = `${s}/${z}/${x}/${y}`;
  const hit = mem.get(key);
  if (hit) {
    log(`200 cache ${key} ${fmt}`);
    if (fmt === "b64") return Response.json({ b64: arrayBufferToB64(hit.buf) });
    return new Response(hit.buf, { headers: { "Content-Type": hit.ct, "Cache-Control": "public, max-age=86400" } });
  }
  try {
    const got = s === "m" ? await grab(`https://mt1.google.com/vt/lyrs=m&hl=ar&x=${x}&y=${y}&z=${z}&s=Galileo`, { "User-Agent": UA }) : await grab(`https://mt1.google.com/vt/lyrs=y&hl=ar&x=${x}&y=${y}&z=${z}&s=Galileo`, { "User-Agent": UA });
    if (mem.size > 600) mem.clear();
    mem.set(key, got);
    log(`200 google ${key} ${fmt} ${got.buf.byteLength}b`);
    if (fmt === "b64") return Response.json({ b64: arrayBufferToB64(got.buf) });
    return new Response(got.buf, { headers: { "Content-Type": got.ct, "Cache-Control": "public, max-age=86400" } });
  } catch (e) {
    try {
      const got = await grab(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, { "User-Agent": "MatjarAqtash/1.0 (contact 0792145720)" });
      if (mem.size > 600) mem.clear();
      mem.set(key, got);
      log(`200 osm ${key} ${fmt} ${got.buf.byteLength}b`);
      if (fmt === "b64") return Response.json({ b64: arrayBufferToB64(got.buf) });
      return new Response(got.buf, { headers: { "Content-Type": got.ct, "Cache-Control": "public, max-age=86400" } });
    } catch (e2) {
      log(`502 ${key} ${fmt}`);
      return new Response("no tile", { status: 502 });
    }
  }
}
function arrayBufferToB64(buf) {
  const bytes = new Uint8Array(buf);
  let s = "";
  const chunk = 32768;
  for (let i = 0; i < bytes.length; i += chunk) {
    s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(s);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  description
});
