import React from "react";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";

interface Props {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  followers: string[];
}

const TagCard = ({ tagData }: { tagData: Props }) => {
  return (
    <article className="w-[260px] shadow-sm  background-light900_dark200 py-8 px-5  light-border border rounded-md max-sm:w-full ">
      <Link href={`tags/${tagData._id}`}>
        <div className="max-w-[100px] max-h-[50px] text-md body-semibold text-dark300_light900 text-center ">
          <RenderTag tagName={tagData.name} />
        </div>
        <p className="text-xs text-dark100_light900 my-5 leading-normal">
          {tagData.description}
        </p>
        <div className="small-medium text-dark400_light500 mt-3.5 ">
          <p>
            <span className="body-semibold primary-text-gradient mr-2.5">
              {" "}
              {tagData.questions.length}+
            </span>
            Questions
          </p>
        </div>
      </Link>
    </article>
  );
};

export default TagCard;
