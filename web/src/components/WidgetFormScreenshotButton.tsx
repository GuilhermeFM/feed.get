import { useCallback, useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";

import { WidgetLoading } from "./WidgetLoading";

interface WidgetFormScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTaken: (base64Image: string | null) => void;
}

export function WidgetFormScreenshotButton({
  screenshot,
  onScreenshotTaken,
}: WidgetFormScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState<boolean>(false);

  const handleScreenshot = useCallback(async () => {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64Image = canvas.toDataURL("image/png");

    onScreenshotTaken(base64Image);
    setIsTakingScreenshot(false);
  }, []);

  if (screenshot) {
    return (
      <button
        className="p1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{ backgroundImage: `url(${screenshot})` }}
        onClick={() => onScreenshotTaken(null)}
        type="button"
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
      onClick={() => handleScreenshot()}
      type="button"
    >
      {isTakingScreenshot ? <WidgetLoading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
