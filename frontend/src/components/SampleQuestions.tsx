import { SampleQuestions as sampleData } from "../data/SampleQuestions";
import { groupByCategory } from "../utils/groupSampleQuestions";
import { useChatStore } from "../store/useChatStore";
import { sendChat } from "../service/chatApi";

export const SampleQuestions = () => {
  const groupedData = groupByCategory(sampleData);
  const addUserMessage = useChatStore((s) => s.addUserMessage);
  const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);
  const setTyping = useChatStore((s) => s.setTyping);
  const isTyping = useChatStore((s) => s.isTyping);
  const handleSend = async (question: string) => {
    if (!question.trim() || isTyping) return;

    addUserMessage(question);
    setTyping(true);
    try {
      const res = await sendChat(question);
      addAssistantMessage(res.answer);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      addAssistantMessage("❌ Server error, please try again.");
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-4">
      <h2 className="text-lg font-semibold">Sample Questions</h2>
      <p className="text-muted-foreground mt-1">
        Choose a question below to start the conversation
      </p>

      <div className="grid grid-cols-2 gap-4 py-6 max-w-4xl w-full">
        {Object.entries(groupedData).map(([category, items]) => (
          <div
            key={category}
            className="border rounded-xl p-4 bg-card transition-shadow"
          >
            <h3 className="font-semibold mb-3">{category}</h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.question}
                  onClick={() => handleSend(item.question)}
                  className="
                    rounded-lg border p-3 cursor-pointer
                    transition-all duration-200
                    hover:shadow-md hover:-translate-y-1
                  "
                >
                  {/* QUESTION (ĐẬM) */}
                  <div className="font-medium text-sm">{item.question}</div>

                  {/* DESCRIPTION (NHẠT) */}
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
