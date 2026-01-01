import type { ChatMessage } from "./chat";
export interface chatState {
  message: ChatMessage[];
  isTyping: boolean;
  addUserMessage: (text: string) => void;
  addAssistantMessage: (text: string) => void;
  updateAssistantMessage: (id: string, text: string) => void;
  clearChat: () => void;
  setTyping: (v: boolean) => void;
}
