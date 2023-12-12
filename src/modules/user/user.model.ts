import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../config";
import TUser, { IUserModel, TOrder } from "./user.interface";
const { Schema } = mongoose;

// const nameSchema = new Schema({

// });
// const addressSchema = new Schema();
const orderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});
// user schema

const userSchema = new Schema<TUser, IUserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  isDeleted: { type: Boolean, default: false },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: { type: [orderSchema] },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

userSchema.post("save", function (doc, next) {
  next();
});

// Query
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// static method

userSchema.statics.isUserExists = async function (userId: string) {
  const user = await this.findOne({ userId });
  return user;
};

const UserModel = mongoose.model<TUser, IUserModel>("User", userSchema);
export default UserModel;
