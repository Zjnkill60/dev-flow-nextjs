import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const LocalSearch = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="relative w-full ">
      <div className="background-light800_darkgradient relative flex min-h-[56px]  items-center gap-11 rounded-xl px-4">
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder={placeholder}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none text-dark-100 shadow-none outline-none dark:text-light-900"
        />
      </div>
    </div>
  );
};

export default LocalSearch;
