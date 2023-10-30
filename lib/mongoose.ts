"use server";
import mongoose from "mongoose";

var stateConnection = 0;
export const connectToDatabase = async () => {
  console.log("stateConnection : ", stateConnection);
  if (stateConnection) {
    console.log("reusing database connection");
    return;
  }
  mongoose.set("strictQuery", false);
  const database = await mongoose.connect(String(process.env.DB_MONGODB_URL), {
    dbName: "DevFlow",
  });

  stateConnection = database.connections[0].readyState;
  console.log("new database connection created");
};
