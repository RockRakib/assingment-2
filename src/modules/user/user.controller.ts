import { Request, Response } from "express";
import { userService } from "./user.service";

const creatUser = async (req: Request, res: Response) => {
  try {
    const user = await req.body.user;

    const result = await userService.creatUserIntoDb(user);

    // response sent
    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDb();
    console.log(result);

    // response sent
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const result = await userService.getUsersFromDbById(userId);
    // console.log(result);

    // response sent
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CreatUserController = {
  creatUser,
  getUser,
  getUserById,
};
