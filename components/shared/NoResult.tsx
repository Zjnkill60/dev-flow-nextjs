import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
}
const NoResult = ({ title, description }: Props) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <Image
        src="/assets/images/light-illustration.png"
        width={200}
        alt="light"
        height={270}
        className="dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        width={200}
        alt="dark"
        height={270}
        className="hidden dark:block"
      />
      <h3 className="h3-bold text-dark200_light800">{title}</h3>
      <p className="text-dark200_light800 max-w-[70%] text-center">
        {description}
      </p>

      <Button className="primary-gradient min-h-[46px] px-3 py-4 text-light-900">
        Ask a Question
      </Button>
    </div>
  );
};

export default NoResult;
