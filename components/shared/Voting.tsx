"use client";
import { handleVotingActionQuestion } from "@/lib/actions/question.action";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import React, { useEffect } from "react";
import { handleVotingActionAnswer } from "@/lib/actions/answer.actions";
import { handleSavedAction } from "@/lib/actions/user.action";
import { handleViewInteractQuestion } from "@/lib/actions/interact.action";
import { usePathname } from "next/navigation";

interface IProps {
  type: string;
  itemId: string;
  userId: string;
  upvoteNumber: number;
  downvoteNumber: number;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isSaved: boolean;
}
const Voting = (props: IProps) => {
  const pathname = usePathname();
  const handleVoting = async (type: string) => {
    if (!props.userId) {
      return;
    }

    if (props.type === "question") {
      await handleVotingActionQuestion({
        typeAction: type,
        questionId: props.itemId,
        userId: props.userId,
        isDownvoted: props.isDownvoted,
        isUpvoted: props.isUpvoted,
      });
    }

    if (props.type === "answer") {
      await handleVotingActionAnswer({
        typeAction: type,
        answerId: props.itemId,
        userId: props.userId,
        isDownvoted: props.isDownvoted,
        isUpvoted: props.isUpvoted,
      });
    }

    // toast({
    //   className: "z-50",
    //   variant: "destructive",
    //   title: "Uh oh! Something went wrong.",
    //   description: "There was a problem with your request.",
    // });
  };

  const handleSave = async () => {
    await handleSavedAction({
      questionId: props.itemId,
      userId: props.userId,
      isSaved: props.isSaved,
    });
  };

  useEffect(() => {
    console.log("USE EFFECT RUN ");
    if (props.type === "question") {
      handleViewInteractQuestion({
        questionId: props.itemId,
        userId: props.userId,
        action: "View",
      });
    }
  }, [props.itemId, props.userId, pathname]);
  return (
    <div className="flex items-center gap-2">
      <div onClick={() => handleVoting("upvote")}>
        {props.isUpvoted ? (
          <Image
            src={"/assets/icons/upvoted.svg"}
            width={20}
            height={20}
            alt="upvote"
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={"/assets/icons/upvote.svg"}
            width={20}
            height={20}
            alt="upvote"
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="p-1 background-light700_dark400 subtle-medium min-w-[17px] text-center rounded-sm text-dark300_light700">
        {props.upvoteNumber}
      </div>
      <div onClick={() => handleVoting("downvote")}>
        {props.isDownvoted ? (
          <Image
            src={"/assets/icons/downvoted.svg"}
            width={20}
            height={20}
            alt="upvote"
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={"/assets/icons/downvote.svg"}
            width={20}
            height={20}
            alt="upvote"
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="p-1 background-light700_dark400 subtle-medium min-w-[17px] text-center rounded-sm text-dark300_light700">
        {props.downvoteNumber}
      </div>
      {props && props.type === "question" ? (
        <div onClick={handleSave}>
          {props.isSaved ? (
            <Image
              src={"/assets/icons/star-filled.svg"}
              width={20}
              height={20}
              alt="star"
              className="cursor-pointer ml-3"
            />
          ) : (
            <Image
              src={"/assets/icons/star-red.svg"}
              width={20}
              height={20}
              alt="star"
              className="cursor-pointer ml-3"
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Voting;
