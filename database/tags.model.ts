import mongoose, { Schema, Model, model,models } from "mongoose";

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

const TagModel = models?.Tag || model("Tag", TagsSchema);
export default TagModel //like this try to export every model in you app like this and it should work
