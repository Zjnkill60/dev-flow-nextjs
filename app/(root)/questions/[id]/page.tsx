"use server";

import AnswerForm from "@/components/forms/AnswerForm";
import Answer from "@/components/shared/Answer";
import Metrix from "@/components/shared/Metrix";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Voting from "@/components/shared/Voting";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { Button } from "@/components/ui/button";
import { AnswerFilters } from "@/constants";
import { getAllAnswerForQuestion } from "@/lib/actions/answer.actions";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { getTimeAgo } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IQuestion {
  _id: string;
  title: string;
  content: string;
  saved: string[];

  tags: {
    name: string;
    _id: string;
  }[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  answers: string[];
  createdAt: Date;
}
interface InfoFetching {
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
    saved: string[];
  };
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
const Page = async ({ params }: { params: { id: number } }) => {
  const { userId } = auth();
  const questionById = (await getQuestionById({ id: params.id })) as IQuestion;
  const author = (await getUserByClerkId({ clerkId: userId })) as InfoFetching;
  const allAnswerForQuestion = (await getAllAnswerForQuestion({
    questionId: questionById._id,
    page: "",
    pageSize: "",
    query: "",
  })) as IAnswerDataFetching[];

  return (
    <>
      <div className="flex flex-wrap justify-between max-sm:flex-col-reverse">
        <Link href={`/profile/${userId}`} className="flex items-center gap-2">
          <Image
            src={questionById.author.picture}
            alt="avatar"
            height={22}
            width={22}
            className="rounded-[999px]"
          />
          <p className="paragraph-semibold text-dark300_light700">
            {questionById.author.name}
          </p>
        </Link>
        <div className="flex justify-end">
          <Voting
            type="question"
            itemId={questionById._id}
            userId={author.user._id}
            upvoteNumber={questionById.upvotes.length}
            downvoteNumber={questionById.downvotes.length}
            isUpvoted={questionById.upvotes.includes(author.user._id)}
            isDownvoted={questionById.downvotes.includes(author.user._id)}
            isSaved={author.user.saved.includes(questionById._id)}
          />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="h2-bold text-dark300_light700">{questionById.title}</h2>
        <div className="flex flex-wrap gap-5 text-dark300_light700 small-regular mt-2">
          <Metrix
            imgUrl={"/assets/icons/clock.svg"}
            alt="clock"
            value={null}
            title={`ask - ${getTimeAgo(questionById.createdAt)}`}
            href={null}
          />
          <Metrix
            imgUrl={"/assets/icons/message.svg"}
            alt="answer"
            value={questionById.answers.length}
            title={"Answers"}
            href={null}
          />
          <Metrix
            imgUrl={"/assets/icons/eye.svg"}
            alt="view"
            value={questionById.views}
            title={"Views"}
            href={null}
          />
        </div>
      </div>
      <div className="mt-10">
        <ParseHTML data={questionById.content} />
      </div>
      <div className="flex gap-3 small-regular mt-5 justify-end">
        {questionById.tags.map((item) => (
          <RenderTag _id={item._id} tagName={item.name} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-7">
        <p className="primary-text-gradient">
          {questionById.answers.length} Answers
        </p>
        <LocalSelect
          filters={AnswerFilters}
          classOther={""}
          placeholder={"Select a Filter"}
        />
      </div>

      <div>
        {allAnswerForQuestion &&
          allAnswerForQuestion.length > 0 &&
          allAnswerForQuestion.map((item) => <Answer data={item} />)}
      </div>

      <div className="flex items-center justify-between max-sm:flex-col gap-5 mt-20">
        <p className="paragraph-semibold text-dark400_light800 ">
          Write your answer here
        </p>
        <Button className="text-primary-500 text-sm gap-2 bg-slate-100 dark:bg-slate-800 border light-border-2 max-sm:w-full">
          <Image
            src={"/assets/icons/stars.svg"}
            alt="star"
            width={16}
            height={16}
            className="object-contain"
          />
          Generate AI answer
        </Button>
      </div>

      <div className="mt-5 ">
        <AnswerForm
          authorId={JSON.stringify(author.user._id)}
          questionById={JSON.stringify(questionById._id)}
        />
      </div>
    </>
  );
};

export default Page;
