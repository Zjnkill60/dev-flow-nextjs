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
  author: string;
}

interface PropsGetQuestionById {
  id: string;
}

export async function getQuestion() {
  try {
    connectToDatabase();
    const questions = await QuestionModel.find({})
      .populate({
        path: "author",
        model: User,
        select: "name picture clerkId",
      })
      .populate({
        path: "tags",
        model: TagModel,
        select: "name",
      });
    return questions;
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestionById(params: PropsGetQuestionById) {
  try {
    connectToDatabase();
    const questions = await QuestionModel.findById({ _id: params.id })
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

    const descriptionTag =
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS";

    for (var tag of tags) {
      const tagExist = await TagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}`, "i") } },
        {
          $setOnInsert: { name: tag, description: descriptionTag },
          $push: { questions: question._id },
        },
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
