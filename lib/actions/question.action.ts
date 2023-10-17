"use sever";

import { connectToDatabase } from "../mongoose";

export function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
