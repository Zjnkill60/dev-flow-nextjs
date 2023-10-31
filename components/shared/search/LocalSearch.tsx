"use client"

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const LocalSearch = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('q')
  const queryFilter = searchParams.get('filter')


  const [search,setSearch] = useState(querySearch || "")
  useEffect(() => {
    console.log("render search bar : ",searchParams.get("filter"))
    let timeout:any
    if(search) {
      timeout = setTimeout(() => {
        queryFilter ? router.push(`?q=${search}?filter=${queryFilter}`) : router.push(`?q=${search}`)
        console.log(search)
      },300)
    }else {
      router.push(`${pathName}`)
    }

    return () => clearTimeout(timeout)

  },[search,querySearch])
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none text-dark-100 shadow-none outline-none dark:text-light-900"
        />
      </div>
    </div>
  );
};

export default LocalSearch;
