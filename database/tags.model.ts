import { Schema, Model, model } from "mongoose";

export interface ITags {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Questions",
    default: [],
  },
  followers: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Users",
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const TagsModel: Model<ITags> = model<ITags>("Tags", TagsSchema);
