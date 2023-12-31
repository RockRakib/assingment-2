/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { z } from "zod";
import { userService } from "./user.service";
import UserValidatioonSchema from "./user.validation";

const creatUser = async (req: Request, res: Response) => {
  try {
    const user = UserValidatioonSchema.parse(req.body);

    const result = await userService.creatUserIntoDb(user);
    if (result) {
      const { password, orders, ...rest } = result.toObject();

      res.status(200).json({
        success: true,
        message: "user created successfully",
        data: rest,
      });
    }

    // response sent

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid data", details: error.errors });
    } else {
      // Handle other errors
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDb();

    // response sent
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// find single user from db

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId);

    const result = await userService.getUserFromDbById(userId);

    // console.log(result);
    if (result) {
      const { password, orders, ...rest } = result.toObject();
      return res.status(200).json({
        success: true,
        message: "users fetch successfully",
        data: rest,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // response sent

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "An unexpected error occurred",
    });
  }
};

// update user
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId);
    const updatedData = req.body;

    const updatedUser = await userService.updateUserFromDbById(
      userId,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId);
    const result = await userService.deleteUserById(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const userOrders = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId);
    const { productName, price, quantity } = req.body;
    const order = { productName, price, quantity };
    const result = userService.getUserOrders(userId, order);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const userAllOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId);
    const orders = await userService.getAllOrders(userId);

    res.status(200).json({
      success: true,
      message: "order fetched successfully",
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const calcTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId);
    const totalPrice = await userService.calcOrderTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: { totalPrice },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const CreatUserController = {
  creatUser,
  getUser,
  getUserById,
  updateUserById,
  deleteUser,
  userOrders,
  userAllOrder,
  calcTotalPrice,
};
