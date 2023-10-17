import mongoose from "mongoose";
const url = "mongodb+srv://zjnkill18:nho812005@devflow.1wyv3tg.mongodb.net/";

export async function connectToDatabase() {
  try {
    await mongoose.connect(url);

    console.log("connect success !");
  } catch (err) {
    console.log(err);
  }
}
