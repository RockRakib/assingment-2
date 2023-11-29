import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./modules/user/user.routes";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
