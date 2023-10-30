"use server";

import QuestionModel from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import InteractionModel from "@/database/interaction.model";
interface IInteract {
  userId: string;
  questionId: string;
  action: string;
}

export async function handleViewInteractQuestion(params: IInteract) {
  const { userId, questionId, action } = params;
  try {
    connectToDatabase();
    await QuestionModel.findByIdAndUpdate(
      { _id: questionId },
      { $inc: { views: 1 } }
    );

    const isExistInteraction = InteractionModel.findOne({
      question: questionId,
      user: userId,
    });
    if (!isExistInteraction) {
      await InteractionModel.create({
        question: questionId,
        user: userId,
        action: action,
        createdAt: new Date(),
      });
    } else {
      return console.log("this user has already interacted as viewer");
    }
  } catch (error) {}
}
