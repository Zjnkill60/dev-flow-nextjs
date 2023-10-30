import Image from "next/image";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";

interface Props {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  joinedAt: Date;
}

const TAGS = [
  {
    name: "HTML",
  },
  {
    name: "CSS",
  },
  {
    name: "NEXTJS",
  },
];

const ProfileCard = ({ userData }: { userData: Props }) => {
  return (
    <article className="min-w-[280px] shadow-sm  background-light900_dark200 py-8 px-5 text-center light-border border rounded-md ">
      <Link href={`profile/${userData.clerkId}`}>
        <Image
          src={userData.picture}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-[999px] mx-auto "
        />
        <h2 className="h3-bold text-dark100_light900 mt-4">{userData.name}</h2>
        <p className="text-sm text-dark100_light900 mt-2">
          @{userData.username}
        </p>
        <div className="flex gap-3 text-xs justify-center mt-5 ">
          {TAGS.map((item) => (
            <RenderTag _id={item.name} key={item.name} tagName={item.name} />
          ))}
        </div>
      </Link>
    </article>
  );
};

export default ProfileCard;
