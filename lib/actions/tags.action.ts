import TagModel from "@/database/tags.model";
import { connectToDatabase } from "../mongoose";
import QuestionModel from "@/database/question.model";

interface IGetTags {
  page: number;
  pageSize: number;
  query: string;
}
export async function getTags(params: IGetTags) {
  try {
    connectToDatabase();
    const tags = await TagModel.find({}).populate({
      path: "questions",
      model: QuestionModel,
    });

    return tags;
  } catch (error) {
    console.log(error);
  }
}
