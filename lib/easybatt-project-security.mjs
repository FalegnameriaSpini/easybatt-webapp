import { createHmac, timingSafeEqual } from "node:crypto";
import { UUID_PATTERN } from "./easybatt-projects.mjs";

export const RECEIPT_COOKIE = "easybatt-project-receipt";
export const RECEIPT_SECONDS = 1800;
export function privateDigest(value, secret) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
export function projectReceipt(id, secret, now = Date.now()) {
  const body = `${id}.${Math.floor(now / 1000) + RECEIPT_SECONDS}`;
  return `${body}.${privateDigest(`receipt:${body}`, secret)}`;
}
export function validProjectReceipt(value, secret, now = Date.now()) {
  if (!secret || typeof value !== "string") return false;
  const [id, expires, signature, extra] = value.split(".");
  if (
    extra ||
    !UUID_PATTERN.test(id || "") ||
    !/^\d{10}$/.test(expires || "") ||
    !/^[a-f0-9]{64}$/.test(signature || "")
  )
    return false;
  const seconds = Math.floor(now / 1000);
  if (Number(expires) <= seconds || Number(expires) > seconds + RECEIPT_SECONDS)
    return false;
  return timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(privateDigest(`receipt:${id}.${expires}`, secret)),
  );
}

export async function limitedJson(request, limit = 16384) {
  if (Number(request.headers.get("content-length")) > limit)
    throw Object.assign(new Error("Richiesta troppo grande."), { status: 413 });
  if (!request.body) throw new SyntaxError();
  const reader = request.body.getReader();
  let total = 0;
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > limit) {
        await reader.cancel();
        throw Object.assign(new Error("Richiesta troppo grande."), {
          status: 413,
        });
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
