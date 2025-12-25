import dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 4000),

  DATABASE_URL: required("DATABASE_URL"),
  REDIS_URL: required("REDIS_URL"),

  SESSION_SECRET: required("SESSION_SECRET"),
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",

  APP_URL: process.env.APP_URL || "http://localhost:4000"
};
