"use server";

import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";


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

export interface IQuestion {
  _id: string;
  title: string;
  content: string;
  saved: string[];

  tags: {
    name: string;
    _id: string;
  }[];
  views: number;
  upvotes: string[];
  downvotes: string[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  answers: string[];
  createdAt: Date;
}
const EditQuestion = async ({ params }: { params: { id: number } }) => {
  const { userId } = auth();
  const author = await getUserByClerkId({ clerkId: userId }) as unknown as InfoFetching;
  const questionDetail = await getQuestionById({id:params.id})  as IQuestion

  return (
    <div>
      {userId == questionDetail?.author?.clerkId ? (
        <>
          <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
          <div className="mt-10">
            <QuestionForm
             type="Edit" 
             authorId={JSON.stringify(author.user._id)} 
             questionDetail={JSON.stringify(questionDetail)}
              />
          </div>
        </>
      ) : <>You is not the owner this question</>} 
    </div>
  );
};

export default EditQuestion;
