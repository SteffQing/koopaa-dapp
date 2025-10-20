import bs58 from "bs58";
import nacl from "tweetnacl";
import { z } from "zod";
import { loginSchema } from "./schema";

function verifySignature(params: z.infer<typeof loginSchema>) {
  const { signature, message, address } = params;

  const signatureBase64 = Buffer.from(signature, "base64");
  const messageBytes = new TextEncoder().encode(message);
  const pubKeyBytes = bs58.decode(address);

  const isValid = nacl.sign.detached.verify(
    messageBytes,
    signatureBase64,
    pubKeyBytes
  );

  return isValid;
}

export default verifySignature;
