"use client";

import QuestionForm from "@/components/forms/QuestionForm";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/lib/mongoose";
import React, { useEffect } from "react";

const AskQuestion = () => {
  // const getUserLogged = async () => {
  //   const clerkId = "1234567";
  //   const user = await getUserByClerkId({ clerkId });
  //   console.log(user);
  // };

  useEffect(() => {
    connectToDatabase();
  }, []);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <div className="mt-10">
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskQuestion;
