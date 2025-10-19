import * as zod from "zod";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const loginSchema = zod.object({
  address: zod.string(),
  // message: zod.string(),
  // signature: zod.string(),
  // domain: zod.string().optional(),
  // uri: zod.string().optional(),
});

const externalLoginSchema = zod.object({
  id: zod.string(),
});

export { loginSchema, externalLoginSchema, JWT_SECRET };
