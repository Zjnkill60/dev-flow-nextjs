import { QuestionCard } from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import Link from "next/link";

const QUESTIONS = [
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: ["Redux", "Javascript"],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "assets/icons/avatar.svg",
    },
    upvotes: 10000,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    title: "Async/Await Function Not Handling Errors Properly",
    tags: ["Javascript"],
    author: {
      _id: "2",
      name: "Sujuta",
      picture: "assets/icons/avatar.svg",
    },
    upvotes: 5,
    views: 12,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    title: "How to Perfectly Center a Div with Tailwind CSS?",
    tags: ["TailwindCss", "Javascript"],
    author: {
      _id: "3",
      name: "Bradon",
      picture: "assets/icons/avatar.svg",
    },
    upvotes: 23,
    views: 1233,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];
export default function Home() {
  const active = "newest";
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
        {QUESTIONS.length > 0 ? (
          QUESTIONS.map((item) => (
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
