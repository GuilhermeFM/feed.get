import express from "express";

import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const submitFeebackUseCase = new SubmitFeedbackUseCase(
    new NodemailerMailAdapter(),
    new PrismaFeedbacksRepository()
  );

  await submitFeebackUseCase.Execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).json();
});
