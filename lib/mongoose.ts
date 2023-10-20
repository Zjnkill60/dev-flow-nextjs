"use server";
import mongoose from "mongoose";

declare global {
  var connection: {
    isConnected: number;
  };
}

export const connectToDatabase = async () => {
  if (global?.connection?.isConnected) {
    console.log("reusing database connection");
    return;
  }
  mongoose.set("strictQuery", false);
  const database = await mongoose.connect(String(process.env.DB_MONGODB_URL), {
    dbName: "DevFlow",
  });

  global.connection.isConnected = database.connections[0].readyState;
  console.log("new database connection created");
};
