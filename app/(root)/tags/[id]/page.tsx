import { QuestionCard } from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getTagDetailById } from "@/lib/actions/tags.action";
import React from "react";

interface IQuestionSaved {
  _id: string;
  title: string;
  tags: {
    name: string;
    _id: string;
  }[];
  author: {
    clerkId:string;
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: object[];
  createdAt: Date;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const tagDetail = await getTagDetailById({
    id: params.id,
    page: 0,
    pageSize: 0,
    query: "",
  }) ;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagDetail.name}</h1>
      <div className="mt-10 flex gap-5 max-sm:flex-col">
        <LocalSearch placeholder="Search by tag name..." />
      </div>
      <div className="mt-10 flex flex-col items-center gap-10">
        {tagDetail && tagDetail.questions?.length > 0 ? (
          tagDetail.questions.map((item : IQuestionSaved) => (
            <QuestionCard
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
            title="There are no question in this Tag !"
          />
        )}
      </div>
    </>
  );
};

export default Page;
