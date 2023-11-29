import User from "./user.interface";

import UserModel from "./user.model";

const creatUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const getUsersFromDb = async () => {
  const result = await UserModel.find();
  return result;
};

const getUsersFromDbById = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const userService = {
  creatUserIntoDb,
  getUsersFromDb,
  getUsersFromDbById,
};
