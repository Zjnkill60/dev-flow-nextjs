import Link from "next/link";
import React from "react";

interface Props {
  tagName: string;
}
const RenderTag = ({ tagName }: Props) => {
  return (
    <Link
      href={"/tags/id"} // fix later
      key={tagName}
    >
      <div className="background-light800_dark400 text-light400_light500 rounded-md p-3 ">
        {tagName}
      </div>
    </Link>
  );
};

export default RenderTag;
