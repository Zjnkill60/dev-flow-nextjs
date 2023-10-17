import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
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
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema: Schema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  portfolioWebsite: {
    type: String,
    required: false,
  },
  reputation: {
    type: Number,
    required: false,
    default: 0,
  },
  saved: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Questions",
  },
  joinedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = model("users", UserSchema);
export default User;
