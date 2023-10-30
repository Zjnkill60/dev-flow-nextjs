import { IQuestionSaved } from "@/app/(root)/collection/page";
import {
  getAllAnswerForUser,
  getAllQuestionForUser,
} from "@/lib/actions/user.action";
import React from "react";
import { QuestionCard } from "../card/QuestionCard";
import Answer from "./Answer";
import Link from "next/link";

interface Props {
  searchParams: string;
  clerkId: string;
  userId: string;
}

interface IAnswerDataFetching {
  _id: string;
  content: string;
  upvotes: string[];
  downvotes: string[];
  question: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
    saved: string[];
  };
  createdAt: Date;
}
const AnswerTab = async ({ searchParams, clerkId, userId }: Props) => {
  const result = (await getAllAnswerForUser({
    userId: userId,
    page: 1,
    pageSize: 10,
  })) as IAnswerDataFetching[];
  console.log(result);
  return (
    <div>
      {result &&
        result.length > 0 &&
        result.map((item) => (
          <Link href={`/questions/${item.question}`}>
            <Answer data={item} />
          </Link>
        ))}
    </div>
  );
};

export default AnswerTab;
