import { Schema, model } from "mongoose";

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
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  author: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  createdAt: [{ type: Date, default: new Date() }],
});

const QuestionModel = model("Questions", questionSchema);
export default QuestionModel;