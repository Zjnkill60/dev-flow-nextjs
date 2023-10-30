"use server";
import QuestionForm from "@/components/forms/QuestionForm";
import { IUser } from "@/database/user.model";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

export interface InfoFetching {
  totalQuestion: string[];
  totalAnswer: string[];
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    bio?: string;
    picture: string;
    location?: string;
    portfolioWebsite?: string;
    reputation?: number;
    joinedAt: Date;
  };
}
const AskQuestion = async () => {
  const { userId } = auth();
  const author = await getUserByClerkId({ clerkId: userId }) as unknown as InfoFetching;
  console.log("page ask render", author);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <div className="mt-10">
        <QuestionForm type="Create"  authorId={JSON.stringify(author.user._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
