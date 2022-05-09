import { useCallback, useState } from "react";

import { FeedbackTypeKeys, FeedbackType } from "./Widget";
import { WidgetFeedbackSent } from "./WidgetFeedbackSent";
import { WidgetFormStep } from "./WidgetFormStep";
import { WidgetFormStepContent } from "./WidgetFormStepContent";

interface WidgetFormProps {
  feedbackType: FeedbackType;
}

export function WidgetForm({ feedbackType }: WidgetFormProps) {
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [selectedFeedbackType, setSelectedFeedbackType] =
    useState<FeedbackTypeKeys | null>(null);

  const handleFeedbackRestart = useCallback(() => {
    setFeedbackSent(false);
    setSelectedFeedbackType(null);
  }, []);

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <WidgetFeedbackSent onSendAnother={() => handleFeedbackRestart()} />
      ) : (
        <>
          {!selectedFeedbackType ? (
            <WidgetFormStep
              feedbackType={feedbackType}
              onFeedbackTypeChange={(type) => {
                setSelectedFeedbackType(type);
              }}
            />
          ) : (
            <WidgetFormStepContent
              feedbackType={feedbackType}
              feedbackTypeKey={selectedFeedbackType}
              onFeedbackSent={() => setFeedbackSent(true)}
              onBackClick={() => handleFeedbackRestart()}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ por
        <a className="ml-1 underline underline-offset-2">Guilherme</a>
      </footer>
    </div>
  );
}
