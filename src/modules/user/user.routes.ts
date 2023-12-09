import express from "express";
import { CreatUserController } from "./user.controller";

const router = express.Router();

router.post("/", CreatUserController.creatUser);

router.get("/", CreatUserController.getUser);
router.get("/:userId", CreatUserController.getUserById);
router.put("/:userId", CreatUserController.updateUserById);
router.delete("/:userId", CreatUserController.deleteUser);
router.put("/:userId/orders", CreatUserController.userOrders);
router.get("/:userId/orders", CreatUserController.userAllOrder);
router.get("/:userId/orders/total-price", CreatUserController.userAllOrder);

export const userRoutes = router;
