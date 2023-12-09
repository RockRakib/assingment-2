import TUser from "./user.interface";

import UserModel from "./user.model";

const creatUserIntoDb = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};
const getUsersFromDb = async () => {
  const result = await UserModel.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);

  return result;
};

const getUserFromDbById = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};
const updateUserFromDbById = async (
  userId: string,
  updatedUserData: Partial<TUser>
) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId },
    [
      {
        $set: updatedUserData,
      },
      {
        $project: {
          password: 0,
        },
      },
    ],
    { new: true }
  );
  return updatedUser;
};

const deleteUserById = async (userId: string) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserOrders = async (
  userId: string,
  orderData: { productName: string; price: number; quantity: number }
) => {
  try {
    const user = await UserModel.findOne({ userId });
    if (!user) {
      throw new Error("user not found");
    }
    if (!user.orders) {
      user.orders = [];
    }
    const newOrderData = { ...orderData };
    user.orders?.push(newOrderData);
    await user.save();
    return true;
  } catch (error) {
    return false;
  }
};

const getAllOrders = async (userId: string) => {
  try {
    const result = await UserModel.findOne({ userId });
    if (!result) {
      throw new Error("user not found");
    }
    return result.orders || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const calcOrderTotalPrice = async (userId: string) => {
  try {
    const result = await UserModel.findOne({ userId });
    if (!result) {
      throw new Error("user not found");
    }
    const TotalPrice = result.orders?.reduce(
      (total, order) => total + (order.price || 0) * (order.quantity || 0),
      0
    );
    return TotalPrice;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
export const userService = {
  creatUserIntoDb,
  getUsersFromDb,
  getUserFromDbById,
  updateUserFromDbById,
  deleteUserById,
  getUserOrders,
  getAllOrders,
  calcOrderTotalPrice,
};
