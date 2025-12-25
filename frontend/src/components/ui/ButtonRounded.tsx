import { MessageCircleMore } from "lucide-react";
import { Button } from "../ui/button";
export function ButtonRounded() {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <MessageCircleMore />
      </Button>
    </div>
  );
}
