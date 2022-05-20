import { prisma } from "../../prisma";

import {
  FeebacksRepositories,
  FeedbackCreadteParams,
} from "../feedbacks-repositories";

export class PrismaFeedbacksRepository implements FeebacksRepositories {
  async create({ type, comment, screenshot }: FeedbackCreadteParams) {
    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
