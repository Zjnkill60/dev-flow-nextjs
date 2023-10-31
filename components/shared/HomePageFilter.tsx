"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const HomePageFilter = ({HomePageFilters} : {HomePageFilters:{name :string , value:string}[]}) => {
    const router = useRouter()
    const param = useSearchParams()
    const pathname = usePathname()
    const [itemActive ,setItemActive] = useState<string>("")

    const handleClickChangeStateFilter = (item:string) => {
        if(itemActive == item) {
            setItemActive("")
            router.push("/")
            return
        }
        setItemActive(item)
        router.push(`/?filter=${item}`)
    }


  return (
    <>
        {HomePageFilters.map(item => <Button
            className={`rounded-md px-5 py-2 ${
                itemActive === item.value
                ? " bg-primary-100 font-semibold text-primary-500"
                : "background-light800_dark400 text-light400_light500 "
            }`}
            key={item.name}
            onClick={() => handleClickChangeStateFilter(item.value)}
          >
            {item.name}
          </Button>)}
    </>
  )
}

export default HomePageFilter