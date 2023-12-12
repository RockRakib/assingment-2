import { z } from "zod";
const orderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UserValidatioonSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).default([]),
  isDeleted: z.boolean().default(false),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderValidation).default([]),
});
export default UserValidatioonSchema;
