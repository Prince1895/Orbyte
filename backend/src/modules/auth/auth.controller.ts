import { Request, Response } from "express";
import { registerUser } from "./auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await registerUser({ email, username, password });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
