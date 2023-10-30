import { IQuestionSaved } from "@/app/(root)/collection/page";
import { getAllQuestionForUser } from "@/lib/actions/user.action";
import React from "react";
import { QuestionCard } from "../card/QuestionCard";

interface Props {
  searchParams: string;
  clerkId: string;
  userId: string;
}
const QuestionTab = async ({ searchParams, clerkId, userId }: Props) => {
  const result = (await getAllQuestionForUser({
    userId: userId,
    page: 1,
    pageSize: 10,
  })) as IQuestionSaved[];

  return (
    <div>
      {result.map((item) => (
        <QuestionCard
          clerkId={clerkId}
          id={item._id}
          title={item.title}
          tags={item.tags}
          author={item.author}
          upvotes={item.upvotes}
          views={item.views}
          answers={item.answers}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default QuestionTab;
