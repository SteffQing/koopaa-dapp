import * as zod from "zod";

const loginSchema = zod.object({
  address: zod.string(),
  message: zod.string(),
  signature: zod.string(),
  domain: zod.string().optional(),
  uri: zod.string().optional(),
});

export { loginSchema };
