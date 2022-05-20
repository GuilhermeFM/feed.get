import { MailAdapter } from "../adapters/mail-adapter";
import { FeebacksRepositories } from "../repositories/feedbacks-repositories";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private mailAdapter: MailAdapter,
    private feedbacksRepositorie: FeebacksRepositories
  ) {}

  async Execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepositorie.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style='font-family: sans-serif; font-size: 16px; color: #222'>`,
        `<p>Tipo do feedback: ${type}</>`,
        `<p>Comentário: ${comment}</>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
