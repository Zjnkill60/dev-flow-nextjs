import { Schema, model, models } from "mongoose";
import User from "./user.model";
import QuestionModel from "./question.model";

export interface IAnswer {
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  createdAt: Date;
}

const answerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: User }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: User }],
  author: { type: Schema.Types.ObjectId, ref: User },
  question: { type: Schema.Types.ObjectId, ref: QuestionModel },
  createdAt: { type: Date, default: new Date() },
});

const Answer = models?.Answer || model("Answer", answerSchema);
export default Answer; //like this try to export every model in you app like this and it should work
