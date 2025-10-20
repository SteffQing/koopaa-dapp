import * as zod from "zod";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const loginSchema = zod.object({
  address: zod.string(),
  message: zod.string(),
  signature: zod.string(),
});

const externalLoginSchema = zod.object({
  id: zod.string(),
});

const signupSchema = zod.object({
  email: zod.string().email(),
});

const signupOtpSchema = zod.object({
  otp: zod.string(),
  id: zod.string(),
  email: zod.string().email(),
  username: zod.string(),
});

const revalidateOtpSchema = signupOtpSchema.omit({
  email: true,
  username: true,
});

const revalidateSchema = zod.object({
  id: zod.string(),
});

export {
  loginSchema,
  externalLoginSchema,
  signupSchema,
  signupOtpSchema,
  revalidateOtpSchema,
  revalidateSchema,
  JWT_SECRET,
};
