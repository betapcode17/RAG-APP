import React, { useEffect, useRef } from "react";
import type { Chat } from "../../types/chat";
import clsx from "clsx";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useChatItemStore } from "../../store/useChatItemStore";

interface Props {
  chat: Chat;
  active?: boolean;
  onSelect: (chat: Chat) => void;
  onRename: (chatId: number, title: string) => void;
  onDelete: (chat: Chat) => void;
}

const ChatItem: React.FC<Props> = ({
  chat,
  active,
  onSelect,
  onRename,
  onDelete,
}) => {
  const {
    openMenuChatId,
    editingChatId,
    editingTitle,
    openMenu,
    closeMenu,
    startEditing,
    setEditingTitle,
    stopEditing,
  } = useChatItemStore();

  const isEditing = editingChatId === chat.id;
  const isMenuOpen = openMenuChatId === chat.id;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const submitRename = () => {
    if (editingTitle.trim() && editingTitle !== chat.title) {
      onRename(chat.id, editingTitle.trim());
    }
    stopEditing();
  };

  return (
    <div
      onClick={() => !isEditing && onSelect(chat)}
      className={clsx(
        "group/chat-item flex items-center justify-between gap-2",
        "px-2 py-2 rounded-md cursor-pointer text-sm",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        active && "bg-gray-300 dark:bg-gray-600 font-medium"
      )}
    >
      <div className="flex-1 truncate">
        {isEditing ? (
          <input
            ref={inputRef}
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onBlur={submitRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitRename();
              if (e.key === "Escape") stopEditing();
            }}
            className="w-full rounded-md px-1 py-0.5 text-sm
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-600
              outline-none"
          />
        ) : (
          <span className="truncate">{chat.title || "New Chat"}</span>
        )}
      </div>

      {!isEditing && (
        <div
          className="opacity-0 group-hover/chat-item:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => (isMenuOpen ? closeMenu() : openMenu(chat.id))}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-2 mt-2 w-36 rounded-md bg-white dark:bg-gray-800 shadow-lg border z-50">
              <button
                onClick={() => startEditing(chat.id, chat.title || "New Chat")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Pencil className="h-4 w-4" />
                Rename
              </button>

              <button
                onClick={() => onDelete(chat)}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
