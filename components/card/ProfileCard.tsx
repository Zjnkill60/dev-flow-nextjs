import Image from "next/image";
import React from "react";
import RenderTag from "../shared/RenderTag";

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
    <div className="min-w-[280px] background-light900_dark200 py-8 px-5 justify-between text-center light-border border rounded-md">
      <Image
        src={userData.picture}
        alt="Avatar"
        width={100}
        height={100}
        className="rounded-[999px] mx-auto mb-2"
      />
      <h2 className="h3-bold text-dark100_light900 my-2">{userData.name}</h2>
      <p className="text-sm text-dark100_light900 my-2">@{userData.username}</p>
      <div className="flex gap-3 text-xs justify-center mt-auto ">
        {TAGS.map((item) => (
          <RenderTag key={item.name} tagName={item.name} />
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
