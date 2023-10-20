"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

interface Props {
  clerkId: string | null;
}

interface ICreateUSer {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
}

interface IUpdateUser {
  clerkId: string;
  dataUpdate: {
    name: string;

    picture: string;
  };
}

export async function getUserByClerkId(params: Props) {
  const { clerkId } = params;
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUser() {
  try {
    connectToDatabase();
    const user = await User.find({});
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(params: ICreateUSer) {
  try {
    connectToDatabase();
    const user = await User.create(params);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: IUpdateUser) {
  try {
    connectToDatabase();
    const { dataUpdate, clerkId } = params;
    const user = await User.findOneAndUpdate({ clerkId }, { dataUpdate });
    return user;
  } catch (error) {
    console.log(error);
  }
}
