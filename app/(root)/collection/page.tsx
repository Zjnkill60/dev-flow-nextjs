import { QuestionCard } from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { QuestionFilters } from "@/constants";
import { getAllQuestionSavedForUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

export interface IQuestionSaved {
  _id: string;
  title: string;
  tags: {
    name: string;
    _id: string;
  }[];
  author: {
    clerkId: string;
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: object[];
  createdAt: Date;
}
const CollectionPage = async ({searchParams} : {searchParams : {q : string}}) => {
  const { userId } = auth();
  const resultFetchQuestion = await getAllQuestionSavedForUser({
    page: 0,
    pageSize: 0,
    searchQuery: searchParams.q,
    userId: userId,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-10 flex gap-5 max-sm:flex-col">
        <LocalSearch placeholder="Search amazing minds here..." />
        <LocalSelect
          classOther=""
          placeholder="Select a Filter"
          filters={QuestionFilters}
        />
      </div>
      <div className="mt-10 flex flex-col items-center gap-10">
        {resultFetchQuestion && resultFetchQuestion.saved?.length > 0 ? (
          resultFetchQuestion.saved.map((item: IQuestionSaved) => (
            <QuestionCard
            clerkId={userId}
              key={item.title}
              id={item._id}
              title={item.title}
              tags={item.tags}
              author={item.author}
              upvotes={item.upvotes}
              views={item.views}
              answers={item.answers}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <NoResult
            description={`Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡`}
            title="There are no question save to show !"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
