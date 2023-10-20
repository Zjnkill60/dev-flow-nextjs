"use server";
import QuestionForm from "@/components/forms/QuestionForm";
import { IUser } from "@/database/user.model";
import { getUserByClerkId } from "@/lib/actions/user.action";
import React from "react";

const AskQuestion = async () => {
  const clerkId = "1234";
  const author: IUser = await getUserByClerkId({ clerkId });
  console.log("page ask render", author);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <div className="mt-10">
        <QuestionForm authorId={JSON.stringify(author._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
