"use server";
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  //@ts-ignore
  if (global?.connection?.isConnected) {
    console.log("reusing database connection");
    return;
  }
  mongoose.set("strictQuery", false);
  const database = await mongoose.connect(String(process.env.DB_MONGODB_URL), {
    dbName: "DevFlow",
  });

  //@ts-ignore
  global.connection = { isConnected: database.connections[0].readyState };
  console.log("new database connection created");
};
