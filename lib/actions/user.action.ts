"use sever";

import UserModel from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

interface Props {
  clerkId: string;
}
export async function getUserByClerkId(params: Props) {
  const { clerkId } = params;
  console.log("clerkId : ", clerkId);
  try {
    connectToDatabase();
    const user = await UserModel.findOne({ clerkId });
    return user;
  } catch (error) {
    console.log(error);
  }
}
