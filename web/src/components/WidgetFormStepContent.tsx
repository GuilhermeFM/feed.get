import { FormEvent, useCallback, useState } from "react";
import { ArrowLeft } from "phosphor-react";

import { FeedbackType, FeedbackTypeKeys } from "./Widget";
import { WidgetCloseButton } from "./WidgetCloseButton";
import { WidgetFormScreenshotButton } from "./WidgetFormScreenshotButton";

interface WidgetFormStepContentProps {
  feedbackType: FeedbackType;
  feedbackTypeKey: FeedbackTypeKeys | null;
  onBackClick: () => void;
  onFeedbackSent: () => void;
}

export function WidgetFormStepContent({
  feedbackType,
  feedbackTypeKey,
  onBackClick,
  onFeedbackSent,
}: WidgetFormStepContentProps) {
  const [comment, setComment] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleSubmitFeedback = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onFeedbackSent();
    },
    [comment, screenshot]
  );

  const { title, image } = feedbackType[feedbackTypeKey!];

  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => onBackClick()}
          type="button"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={image.source} alt={image.alt} className="w-6 h-6" />
          {title}
        </span>
        <WidgetCloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[240px] md:min-w-[320px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo....."
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        ></textarea>

        <footer className="flex gap-2 mt-2">
          <WidgetFormScreenshotButton
            onScreenshotTaken={(base64Image) => setScreenshot(base64Image)}
            screenshot={screenshot}
          />
          <button
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500 transition-colors"
            disabled={comment.length === 0}
            type="submit"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
