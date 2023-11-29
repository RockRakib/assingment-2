import mongoose from "mongoose";
import User from "./user.interface";
const { Schema } = mongoose;

const nameSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

// user schema

const userSchema = new Schema<User>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: nameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: addressSchema,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
