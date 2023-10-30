import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import ParseHTML from "./ParseHTML";
import Link from "next/link";
import Voting from "./Voting";
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
const Answer = ({ data }: { data: IAnswerDataFetching }) => {
  return (
    <div key={data._id}>
      <div className="flex flex-wrap justify-between max-sm:flex-col-reverse gap-3 mt-10 mb-5">
        <div className="flex sm:items-center gap-2 max-sm:flex-col">
          <Link
            href={`/profile/${data.author.clerkId}`}
            className="flex items-center gap-2 "
          >
            <Image
              src={data.author.picture}
              alt="avatar"
              height={22}
              width={22}
              className="rounded-[999px]"
            />
            <p className=" body-semibold  text-dark300_light700">
              {data.author.name}
            </p>
          </Link>
          <p className="small-regular text-light400_light500">
            ~ answered {formatDate(data.createdAt)}
          </p>
        </div>
        <div className="flex justify-end">
          <Voting
            type="answer"
            itemId={data._id}
            userId={data.author._id}
            upvoteNumber={data.upvotes.length}
            downvoteNumber={data.downvotes.length}
            isUpvoted={data.upvotes.includes(data.author._id)}
            isDownvoted={data.downvotes.includes(data.author._id)}
            isSaved={false}
          />
        </div>
      </div>

      <div>
        <ParseHTML data={data.content} />
      </div>
      <span className="w-full h-[1px] bg-slate-100 dark:bg-slate-700 my-14 block"></span>
    </div>
  );
};

export default Answer;
