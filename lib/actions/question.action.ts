"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import TagModel from "@/database/tags.model";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";

interface PropsCreateQuestion {
  title: string;
  content: string;
  tags: string[];
  views: number;
  upvotes: string;
  downvotes: string;
  author: string;
  answers: string;
  createdAt: Date;
}

interface PropsGetQuestion {
  page: number;
  pageSize: number;
  query: string;
}

export async function getQuestion(params: PropsGetQuestion) {
  try {
    connectToDatabase();
    const questions = await QuestionModel.find({})
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "tags",
        model: TagModel,
      });
    return questions;
  } catch (error) {
    console.log(error);
  }
}

export async function createQuestion(params: PropsCreateQuestion) {
  console.log("params :", params);
  try {
    connectToDatabase();
    const tagsDocument = [];
    const { title, content, tags, author } = params;
    const question = await QuestionModel.create({
      title,
      content,
      author,
      createdAt: new Date(),
    });

    for (var tag of tags) {
      const tagExist = await TagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagsDocument.push(tagExist);
    }

    await QuestionModel.updateOne(
      { _id: question._id },
      { $push: { tags: { $each: tagsDocument } } }
    );

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
