"use server";
import { QuestionCard } from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import { getQuestion } from "@/lib/actions/question.action";
import Link from "next/link";

export default async function Home() {
  const active = "newest";

  const resultFetchQuestion = await getQuestion();

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-3 py-4 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex gap-9 max-sm:flex-col sm:items-center">
        <LocalSearch placeholder={"Search question..."} />
        <LocalSelect
          filters={HomePageFilters}
          placeholder={"Select a Filter"}
        />
      </div>
      <div className="mt-10 flex items-center gap-5 max-md:hidden">
        {HomePageFilters.map((item) => (
          <Button
            className={`rounded-md px-5 py-2 ${
              active === item.value
                ? " bg-primary-100 font-semibold text-primary-500"
                : "background-light800_dark400 text-light400_light500 "
            }`}
            key={item.name}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-10">
        {resultFetchQuestion && resultFetchQuestion.length > 0 ? (
          resultFetchQuestion &&
          resultFetchQuestion.map((item) => (
            <QuestionCard
              key={item.title}
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
            title="There are no question to show !"
          />
        )}
      </div>
    </>
  );
}
