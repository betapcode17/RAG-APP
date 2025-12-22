// SampleQuestions
import React from "react";

const groups = [
  {
    title: "Returns & Refunds",
    items: [
      {
        text: "How long do I have to return an item?",
        subs: ["Within 30 days", "Original packaging required"],
      },
      {
        text: "When will I receive my refund?",
        subs: ["3–5 business days", "Depends on payment method"],
      },
      {
        text: "What items are excluded from returns?",
        subs: ["Gift cards", "Final sale items"],
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        text: "What time do orders need to be placed to ship same day?",
        subs: ["Before 2 PM", "Business days only"],
      },
      {
        text: "How long does standard shipping take?",
        subs: ["5–7 business days"],
      },
    ],
  },
];
export const SampleQuestions = () => {
  return (
    <div className="flex flex-col items-center py-4">
      <h2 className="text-lg font-semibold">Sample Questions</h2>
      <p className="text-muted-foreground mt-1">
        Choose a question below to start the conversation
      </p>

      <div className="grid grid-cols-2 gap-4 py-6 max-w-4xl w-full">
        {groups.map((group) => (
          <div
            key={group.title}
            className="border rounded-xl p-4 bg-card transition-shadow"
          >
            <h3 className="font-semibold mb-3">{group.title}</h3>

            <div className="space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.text}
                  className="
                    rounded-lg border p-3 cursor-pointer
                    transition-all duration-200
                    hover:shadow-md hover:-translate-y-1
                  "
                >
                  {/* ITEM (ĐẬM) */}
                  <div className="font-medium text-sm">{item.text}</div>

                  {/* SUB ITEMS (NHẠT) */}
                  <div className="mt-1 space-y-1">
                    {item.subs.map((sub) => (
                      <div key={sub} className="text-xs text-muted-foreground">
                        {sub}
                      </div>
                    ))}
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
