import React from "react";
import type { Chat } from "../../types/chat";
import clsx from "clsx";

interface Props {
  chat: Chat;
  active?: boolean;
  onSelect: (chat: Chat) => void;
}

const ChatItem: React.FC<Props> = ({ chat, active, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(chat)}
      className={clsx(
        "group/chat-item flex items-center gap-2",
        "px-2 py-2 rounded-md cursor-pointer text-sm transition-colors",

        "hover:bg-gray-200 dark:hover:bg-gray-700",

        active
          ? "bg-gray-300 dark:bg-gray-600 font-medium"
          : "text-gray-800 dark:text-gray-200"
      )}
    >
      <span
        className="
          truncate
          transition-all duration-200
          group-data-[collapsible=icon]:opacity-0
          group-data-[collapsible=icon]:w-0
          group-data-[collapsible=icon]:overflow-hidden
        "
      >
        {chat.title || "New Chat"}
      </span>
    </div>
  );
};

export default ChatItem;
