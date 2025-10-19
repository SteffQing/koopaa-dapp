import { GridClient } from "@sqds/grid";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = crypto
  .createHash("sha256")
  .update(process.env.GRID_HASH_KEY!)
  .digest(); // 32 bytes
const IV_LENGTH = 16; // AES-GCM IV length

function encryptKey(secret: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(secret, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

function decryptKey(data: string): string {
  const buf = Buffer.from(data, "base64");
  const iv = buf.subarray(0, IV_LENGTH);
  const tag = buf.subarray(IV_LENGTH, IV_LENGTH + 16);
  const encrypted = buf.subarray(IV_LENGTH + 16);
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

const gridClient = new GridClient({
  environment: "sandbox",
  apiKey: process.env.GRID_SANDBOX_KEY!,
  baseUrl: "https://grid.squads.xyz",
});

export { gridClient, decryptKey, encryptKey };
