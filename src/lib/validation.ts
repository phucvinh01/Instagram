import * as z from "zod"
 export const SignUpValidation = z.object({
  name: z.string().min(2,'to shoot'),
  email: z.string().email(),
  password: z.string().min(8,'password must be at least 8 charaters'),
  username: z.string().min(2,'to shoot'),
})

 export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8,'password must be at least 8 charaters'),
})

 export const PostValidation = z.object({
  caption: z.string().max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
 })