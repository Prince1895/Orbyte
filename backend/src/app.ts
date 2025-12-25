import express from "express";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
