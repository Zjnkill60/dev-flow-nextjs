import TagModel from "@/database/tags.model";
import { connectToDatabase } from "../mongoose";
import QuestionModel from "@/database/question.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

interface IGetTags {
  page: number;
  pageSize: number;
  queryString: string;
}

interface IGetTagsDetail {
  id: string;
  page: number;
  pageSize: number;
  query: string;
}
export async function getTags(params: IGetTags) {
  try {
    connectToDatabase();

    const {queryString} = params
    const query:FilterQuery<typeof TagModel> = {}
    if(queryString) {
      query.$or = [
        {name : {$regex: new RegExp(queryString,'i')}},
      ]
    }
    const tags = await TagModel.find(query).populate({
      path: "questions",
      model: QuestionModel,
    });

    return tags;
  } catch (error) {
    console.log(error);
  }
}

export async function getTagDetailById(params: IGetTagsDetail) {
  try {
    connectToDatabase();
    const tag = await TagModel.findOne({ _id: params.id }).populate({
      path: "questions",
      model: QuestionModel,
      populate: [
        { path: "tags", model: TagModel },
        { path: "author", model: User },
      ],
    });

    return tag;
  } catch (error) {
    console.log(error);
  }
}

export async function getTop5HotTag() {
  try {
    connectToDatabase();
    const tag = await TagModel.find({}).limit(5).sort("-questions")
  

    return tag;
  } catch (error) {
    console.log(error);
  }
}
