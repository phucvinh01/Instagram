import * as z from "zod"
 export const SignUpValidation = z.object({
  name: z.string().min(2,'to shoot'),
  email: z.string().email(),
  password: z.string().min(8,'password must be at least 8 charaters'),
  username: z.string().min(2,'to shoot'),
})