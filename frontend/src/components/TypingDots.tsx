import { Circle } from "lucide-react";

export const TypingDots = () => {
  return (
    <div className="flex items-center gap-1">
      <Circle className="h-2 w-2 fill-foreground text-foreground animate-pulse" />
      <Circle className="h-2 w-2 fill-foreground text-foreground animate-pulse [animation-delay:150ms]" />
      <Circle className="h-2 w-2 fill-foreground text-foreground animate-pulse [animation-delay:300ms]" />
    </div>
  );
};
