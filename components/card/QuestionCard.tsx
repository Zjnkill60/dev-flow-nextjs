
import { getTimeAgo } from "@/lib/utils";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metrix from "../shared/Metrix";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?:string|null
  id: string;
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
export const QuestionCard = ({
  clerkId,
  id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
   const isShowButtonEdit = clerkId === author.clerkId
  return (
    <Link href={`/questions/${id}`} className="w-full">
      <div className="card-wrapper flex  flex-col px-14 py-7 max-md:px-7">
        <div className="flex justify-between sm:items-center max-sm:flex-col-reverse gap-3">
         <div>
         <p className="text-dark400_light700 text-xs sm:hidden">
            {getTimeAgo(createdAt)}
          </p>
          <h2 className="h3-bold text-dark200_light800 line-clamp-1 max-md:text-lg ">
            {title}
          </h2>
         </div>
        
         <div className="flex justify-end">
         {isShowButtonEdit && <EditDeleteAction type="Question" itemId={JSON.stringify(id)} clerkId={clerkId}/>}
         </div>
        
        </div>
        <div className="mt-5 flex gap-5 text-xs">
          {tags.map((item) => (
            <RenderTag key={item.name} tagName={item.name} _id={item._id} />
          ))}
        </div>

        <div className="text-dark200_light800 mt-5 flex flex-wrap justify-between gap-3 text-sm ">
          <div>
            <Metrix
              imgUrl={author.picture}
              alt="Avatar"
              value={author.name}
              title={`ask - ${getTimeAgo(createdAt)}`}
              href={`/profile/${author.clerkId}`}
            />
          </div>
          <div className="flex gap-10">
            <Metrix
              imgUrl={"/assets/icons/like.svg"}
              alt="like"
              value={upvotes.length}
              title={"Votes"}
              href={null}
            />
            <Metrix
              imgUrl={"/assets/icons/message.svg"}
              alt="answer"
              value={answers.length}
              title={"Answers"}
              href={null}
            />
            <Metrix
              imgUrl={"/assets/icons/eye.svg"}
              alt="view"
              value={views}
              title={"Views"}
              href={null}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
