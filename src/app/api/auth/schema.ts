import * as zod from "zod";

const loginSchema = zod.object({
  address: zod.string(),
  message: zod.string(),
  signature: zod.string(),
});

export { loginSchema };
