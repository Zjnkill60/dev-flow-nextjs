"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/question.model";
import TagModel from "@/database/tags.model";
import Answer from "@/database/answer.model";
import { FilterQuery } from "mongoose";

interface Props {
  _id: string;
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

interface PropsSavedAction {
  questionId: string;
  userId: string;
  isSaved: boolean;
}

interface PropsGetQuestionForUser {
  userId: string | null;
  page: number;
  pageSize: number;
  searchQuery: string;
}
export async function getAllQuestionSavedForUser(
  params: PropsGetQuestionForUser
) {
  try {
    connectToDatabase();
    const {searchQuery} = params
    const query:FilterQuery<typeof User> = {}
    if(searchQuery) {
      query.$or = [
        {title : {$regex: new RegExp(searchQuery,'i')}},
        {content : {$regex: new RegExp(searchQuery,'i')}}
      ]
    }
    const listQuestion = await User.findOne({
      clerkId: params.userId,
    }).populate({
      path: "saved",
      match:query,
      model: QuestionModel,
      populate: [
        { path: "tags", model: TagModel },
        { path: "author", model: User },
      ],
    });
    return listQuestion;
  } catch (error) {
    console.log(error);
  }
}

export async function handleSavedAction(params: PropsSavedAction) {
  const { questionId, userId, isSaved } = params;
  try {
    connectToDatabase();
    let queryUpdate = {};
    if (isSaved) {
      queryUpdate = { $pull: { saved: questionId } };
    } else {
      queryUpdate = { $push: { saved: questionId } };
    }

    await User.findByIdAndUpdate({ _id: userId }, queryUpdate, { new: true });
    revalidatePath(`/questions/${questionId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByClerkId(params: { clerkId: string | null }) {
  const { clerkId } = params;
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId });
    const totalQuestion = await QuestionModel.find({ author: user._id });
    const totalAnswer = await Answer.find({ author: user._id });

    return { user, totalQuestion, totalAnswer };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUser({searchQuery} : {searchQuery:string}) {
  try {
    connectToDatabase();
    const query:FilterQuery<typeof User> = {}
    if(searchQuery) {
      query.$or = [
        {name : {$regex: new RegExp(searchQuery,'i')}},
        {username : {$regex: new RegExp(searchQuery,'i')}}
      ]
    }
    const user = await User.find(query);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllQuestionForUser({
  userId,
  page,
  pageSize,
}: {
  userId: string;
  page: number;
  pageSize: number;
}) {
  try {
    connectToDatabase();
    const userQuestion = await QuestionModel.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags")
      .populate("author");
    return userQuestion;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAnswerForUser({
  userId,
  page,
  pageSize,
}: {
  userId: string;
  page: number;
  pageSize: number;
}) {
  try {
    connectToDatabase();
    const userAnswer = await Answer.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })

      .populate("author");
    return userAnswer;
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
