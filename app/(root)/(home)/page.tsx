"use server";
import { QuestionCard } from "@/components/card/QuestionCard";
import HomePageFilter from "@/components/shared/HomePageFilter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import { getQuestion } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home({searchParams} : {searchParams : {q : string,filter:string}}) {

  const { userId } = auth()
  const resultFetchQuestion = await getQuestion(
    {searchQuery : searchParams.q , filterQuery : searchParams.filter}
  );
    console.log("home render", searchParams.filter)
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
          classOther={"md:hidden"}
          placeholder={"Select a Filter"}
        />
      </div>
      <div className="mt-10 flex items-center gap-5 max-md:hidden">
        <HomePageFilter HomePageFilters={HomePageFilters}/>
      </div>

      <div className="mt-10 flex flex-col items-center gap-10">
        {resultFetchQuestion && resultFetchQuestion.length > 0 ? (
          resultFetchQuestion &&
          resultFetchQuestion.map((item) => (
            <QuestionCard

              key={item.title}
              clerkId={userId}
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
            title="There are no question to show !"
          />
        )}
      </div>
    </>
  );
}
