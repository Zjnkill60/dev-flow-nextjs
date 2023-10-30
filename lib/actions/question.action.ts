"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import TagModel from "@/database/tags.model";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import InteractionModel from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

interface PropsCreateQuestion {
  title: string;
  content: string;
  tags: string[];
  author: string;
}

interface PropsGetQuestionById {
  id: number;
}

interface PropsVotingAction {
  typeAction: string;
  questionId: string;
  userId: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
}

export async function handleVotingActionQuestion(params: PropsVotingAction) {
  const { typeAction, questionId, userId, isUpvoted, isDownvoted } = params;
  try {
    connectToDatabase();
    let queryUpdate = {};
    if (typeAction === "upvote") {
      if (isUpvoted) {
        queryUpdate = { $pull: { upvotes: userId } };
      } else if (isDownvoted) {
        queryUpdate = {
          $pull: { downvotes: userId },
          $push: { upvotes: userId },
        };
      } else {
        queryUpdate = { $push: { upvotes: userId } };
      }
    }

    if (typeAction === "downvote") {
      if (isUpvoted) {
        queryUpdate = {
          $pull: { upvotes: userId },
          $push: { downvotes: userId },
        };
      } else if (isDownvoted) {
        queryUpdate = { $pull: { downvotes: userId } };
      } else {
        queryUpdate = { $push: { downvotes: userId } };
      }
    }
    console.log(queryUpdate);
    const questions = await QuestionModel.findByIdAndUpdate(
      { _id: params.questionId },
      queryUpdate,
      { new: true }
    );

    revalidatePath(`questions/${questionId}`);
    return questions;
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestion({searchQuery} : {searchQuery:string}) {
  try {
    connectToDatabase();

    const query:FilterQuery<typeof QuestionModel> = {}
    if(searchQuery) {
      query.$or = [
        {title : {$regex: new RegExp(searchQuery,'i')}}
      ]
    }
    const questions = await QuestionModel.find(query)
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


export async function removeAQuestion({_id,clerkId} : {_id : string,clerkId:string}) {
  try {
    connectToDatabase();
    await QuestionModel.deleteOne({ _id})
    await Answer.deleteMany({question:_id})
    await TagModel.updateMany({},{$pull : {question:_id}})
    await InteractionModel.deleteMany({question:_id})
    revalidatePath(`/profile/${clerkId}`)
     
  } catch (error) {
    console.log(error);
  }
}

export async function editQuestion({title,content,questionId} : {title:string,content:string,questionId:string}) {
  try {
    connectToDatabase();
    await QuestionModel.updateOne({_id:questionId},{title,content})
  
    revalidatePath(`/`)
     
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

export async function getTop5HotQuestion() {
  try {
    connectToDatabase();
    const tag = await QuestionModel.find({}).limit(5).sort({upvotes:-1,view:-1})
  

    return tag;
  } catch (error) {
    console.log(error);
  }
}
