"use server";

import { connectToDatabase } from "../mongoose";
import Answer from "@/database/answer.model";
import QuestionModel from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

interface PropsCreateAnswer {
  content: string;
  author: string;
  question: string;
}

interface PropsGetAllAnswer {
  questionId: string;
  page: string;
  pageSize: string;
  query: string;
}

interface PropsVotingAction {
  typeAction: string;
  answerId: string;
  userId: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
}

export async function handleVotingActionAnswer(params: PropsVotingAction) {
  const { typeAction, answerId, userId, isUpvoted, isDownvoted } = params;
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
    const answer = await Answer.findByIdAndUpdate(
      { _id: answerId },
      queryUpdate,
      { new: true }
    );

    revalidatePath(`questions/${answer.question}`);
    return answer;
  } catch (error) {
    console.log(error);
  }
}

export async function createAnswer(params: PropsCreateAnswer) {
  try {
    connectToDatabase();

    let answer = await Answer.create({ ...params, createdAt: new Date() });
    await QuestionModel.updateOne(
      { _id: params.question },
      { $push: { answers: answer._id } }
    );
    revalidatePath(`/questions/${params.question}`);
    return answer;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAnswerForQuestion(params: PropsGetAllAnswer) {
  try {
    connectToDatabase();

    let answer = await Answer.find({ question: params.questionId })
      .populate({
        path: "author",
        model: User,
      })
      .sort("-createdAt");

    return answer;
  } catch (error) {
    console.log(error);
  }
}
