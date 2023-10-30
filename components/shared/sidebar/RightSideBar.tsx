import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import { getTop5HotQuestion } from "@/lib/actions/question.action";
import { log } from "console";
import { IQuestionSaved } from "@/app/(root)/collection/page";
import { getTop5HotTag } from "@/lib/actions/tags.action";


interface ITags {
  _id:string
  name: string;
  description: string;
  questions: string[];
  followers: string[];
  createdAt: Date;
}

const RightSideBar = async () => {
  const topQuestions = await getTop5HotQuestion() as IQuestionSaved[]
  const topTags = await getTop5HotTag() as ITags[]
  console.log(topQuestions)
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col
    border-l p-8 pt-36  max-xl:hidden"
    >
      <p className="text-dark200_light900 h3-bold mb-8">Top Questions</p>
      {topQuestions.map((item) => (
        <Link
          href={`/questions/${item._id}`} // fix later
          key={item._id}
          className="my-3 flex items-center justify-between gap-10"
        >
          <p className="text-dark500_light700">{item.title}</p>
          <Image
            src="/assets/icons/chevron-right.svg"
            alt="arrow"
            width={20}
            height={20}
            className="invert-colors"
          />
        </Link>
      ))}

      <p className="text-dark200_light900 h3-bold mb-5 mt-8">Popular Tags</p>
      {topTags.map((item) => (
        <div
          key={item.name}
          className="my-2 flex items-center justify-between gap-3 text-xs"
        >
          <RenderTag _id={item._id} tagName={item.name} />
          <span className="text-dark100_light900">{item.questions.length}</span>
        </div>
      ))}
    </section>
  );
};

export default RightSideBar;
