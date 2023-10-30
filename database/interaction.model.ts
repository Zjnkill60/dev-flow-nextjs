import mongoose, { Schema, Model, model, models } from "mongoose";
import User from "./user.model";
import QuestionModel from "./question.model";
import TagModel from "./tags.model";

export interface IInteractions {
  action: string;
  user: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId;
  createdAt: Date;
}

const InteractionsSchema: Schema = new Schema({
  action: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
    ref: User,
  },
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: QuestionModel,
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: TagModel,
  },
  createdAt: {
    type: Date,

    default: Date.now,
  },
});

const InteractionModel =
  models?.Interaction || model("Interaction", InteractionsSchema);
export default InteractionModel; //like this try to export every model in you app like this and it should work
