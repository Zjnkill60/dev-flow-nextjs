import { Schema, model, models } from "mongoose";
import User from "./user.model";
import TagModel from "./tags.model";

export interface IQuestion {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: TagModel }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: User },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  createdAt: { type: Date, default: new Date() },
});

const QuestionModel = models?.Question || model("Question", questionSchema);
export default QuestionModel; //like this try to export every model in you app like this and it should work
