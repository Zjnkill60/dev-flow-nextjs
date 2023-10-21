import Metrix from "@/components/shared/Metrix";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { AnswerFilters } from "@/constants";
import { getQuestionById } from "@/lib/actions/question.action";
import { getTimeAgo } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IQuestion {
  title: string;
  content: string;
  tags: {
    name: string;
  }[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: {
    name: string;
    picture: string;
    clerkId: string;
  };
  answers: string[];
  createdAt: Date;
}
const Page = async ({ params }: { params: { id: string } }) => {
  const questionById = (await getQuestionById({ id: params.id })) as IQuestion;
  return (
    <>
      <div className="flex flex-wrap justify-between max-sm:flex-col-reverse">
        <div className="flex items-center gap-2">
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
        </div>
        <div className="flex justify-end">Voting</div>
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
          <RenderTag tagName={item.name} />
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
    </>
  );
};

export default Page;
