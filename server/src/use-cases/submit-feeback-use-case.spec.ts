import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const createSendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { sendMail: createFeedbackSpy },
  { create: createSendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.Execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "data:image/png;base64,Screenshot",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(createSendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.Execute({
        type: "",
        comment: "Example comment",
        screenshot: "data:image/png;base64,Screenshot",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.Execute({
        type: "Type",
        comment: "",
        screenshot: "data:image/png;base64,Screenshot",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with a invalid screenshot", async () => {
    await expect(
      submitFeedback.Execute({
        type: "Type",
        comment: "Example comment",
        screenshot: "Example screenchot",
      })
    ).rejects.toThrow();
  });
});
