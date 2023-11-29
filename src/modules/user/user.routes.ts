import express from "express";
import { CreatUserController } from "./user.controller";

const router = express.Router();

router.post("/", CreatUserController.creatUser);

router.get("/", CreatUserController.getUser);
router.get("/:userId", CreatUserController.getUserById);
// router.put("/:userId/orders",)

export const userRoutes = router;
