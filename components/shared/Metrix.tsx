import { shortenNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  imgUrl: string;
  alt: string;
  value: number | string | null;
  title: string;
  href: string | null;
}
const Metrix = ({ imgUrl, alt, value, title, href }: Props) => {
  if (href) {
    return (
      <Link href={href} className="flex gap-1 items-center">
        <Image
          src={imgUrl}
          width={16}
          height={16}
          className=" rounded-[999px]"
          alt={alt}
        />

        <p>{value}</p>
        <p>{title}</p>
      </Link>
    );
  }

  return (
    <div className="flex gap-1 items-center">
      <Image
        src={imgUrl}
        width={16}
        height={16}
        className="invert-colors"
        alt={alt}
      />

      <p>{shortenNumber(value)}</p>
      <p>{title}</p>
    </div>
  );
};

export default Metrix;
