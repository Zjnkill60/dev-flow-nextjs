import { shortenNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href: string | null;
}
const Metrix = ({ imgUrl, alt, value, title, href }: Props) => {
  if (href) {
    return (
      <Link href={href} className="flex gap-2">
        <Image
          src={imgUrl}
          width={20}
          height={20}
          className=" rounded-[999px]"
          alt={alt}
        />

        <p>{value}</p>
        <p>{title}</p>
      </Link>
    );
  }

  return (
    <div className="flex gap-2">
      <Image
        src={imgUrl}
        width={20}
        height={20}
        className="invert-colors"
        alt={alt}
      />

      <p>{shortenNumber(Number(value))}</p>
      <p>{title}</p>
    </div>
  );
};

export default Metrix;
