import { getUserByClerkId } from "@/lib/actions/user.action";
import Image from "next/image";
import React from "react";
import { formatMonthYear } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgeCard from "@/components/card/BadgeCard";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab";

export interface InfoFetching {
  totalQuestion: string[];
  totalAnswer: string[];
  user: {
    _id: string;
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
  };
}

const page = async ({ params }: { params: { id: string } }) => {
  const userInfo = (await getUserByClerkId({
    clerkId: params.id,
  })) as InfoFetching;

  return (
    <div className="w-full">
      <div className="flex sm:items-center justify-between max-sm:flex-col-reverse">
        <div className="flex md:items-center gap-10 max-md:flex-col ">
          <Image
            src={userInfo.user.picture}
            alt="avatar"
            height={150}
            width={150}
            className="rounded-[999px]"
          />
          <div>
            <h3 className="h3-bold text-dark300_light700">
              {userInfo.user.name}
            </h3>
            <p className="text-dark300_light700 text-sm">
              @{userInfo.user.username}
            </p>
            <div className="flex items-center gap-1 mt-3">
              <Image
                src={"/assets/icons/calendar.svg"}
                alt="avatar"
                height={20}
                width={20}
              />
              <p className=" text-dark300_light700 text-sm">
                Joined {formatMonthYear(userInfo.user.joinedAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5">
          <Link href={"/profile/edit"}>
            <Button className="paragraph-medium btn-secondary text-dark300_light700 min-h-[46px] min-w-[175px]">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <h4 className="h3-bold text-dark300_light900 my-5">Stats</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 xs:grid-cols-2 mt-5 gap-5">
          <BadgeCard
            urlImage={""}
            value={"Questions"}
            name="Answers"
            totalAnswer={userInfo.totalQuestion.length}
            totalQuestion={userInfo.totalAnswer.length}
          />
          <BadgeCard
            urlImage={"/assets/icons/gold-medal.svg"}
            value={0}
            name="Gold Badges"
            totalAnswer={null}
            totalQuestion={null}
          />
          <BadgeCard
            urlImage={"/assets/icons/silver-medal.svg"}
            value={0}
            name="Gold Badges"
            totalAnswer={null}
            totalQuestion={null}
          />
          <BadgeCard
            urlImage={"/assets/icons/bronze-medal.svg"}
            value={0}
            name="Gold Badges"
            totalAnswer={null}
            totalQuestion={null}
          />
        </div>
      </div>
      <div className="mt-10">
        <Tabs defaultValue="top-post" className="max-w-full">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-post" className="tab">
              Questions
            </TabsTrigger>
            <TabsTrigger value="answer" className="tab">
              Answer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-post">
            <QuestionTab
              searchParams={"searchParams"}
              userId={userInfo.user._id}
              clerkId={params.id}
            />
          </TabsContent>
          <TabsContent value="answer">
            <AnswerTab
              searchParams={"searchParams"}
              userId={userInfo.user._id}
              clerkId={params.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
