import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const DATA_QUESTION_HARD_CODE = [
  "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  "Can I get the course for free?",
  "Redux Toolkit Not Updating State as Expected",
  "Async/Await Function Not Handling Errors Properly",
  "How do I use express as a custom server in NextJS?",
];

const POPULAR_TAG = [
  {
    tagName: "NEXTJS",
    totalQuestion: 9,
  },
  {
    tagName: "REACT",
    totalQuestion: 4,
  },
  {
    tagName: "CSS",
    totalQuestion: 3,
  },
  {
    tagName: "JAVASCRIPT",
    totalQuestion: 7,
  },
  {
    tagName: "NODEJS",
    totalQuestion: 10,
  },
];

const RightSideBar = () => {
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col
    border-l p-8 pt-36 shadow-light-300 max-xl:hidden"
    >
      <p className="text-dark200_light900 h3-bold mb-8">Top Questions</p>
      {DATA_QUESTION_HARD_CODE.map((item) => (
        <Link
          href={`/questions/id`} // fix later
          key={item}
          className="my-3 flex items-center justify-between gap-10"
        >
          <p className="text-dark500_light700">{item}</p>
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
      {POPULAR_TAG.map((item) => (
        <div
          key={item.tagName}
          className="my-2 flex items-center justify-between gap-3 text-xs"
        >
          <RenderTag tagName={item.tagName} />
          <span className="text-dark100_light900">{item.totalQuestion}</span>
        </div>
      ))}
    </section>
  );
};

export default RightSideBar;
