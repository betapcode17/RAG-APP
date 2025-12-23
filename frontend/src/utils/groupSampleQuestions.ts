import type { SampleQuestion } from "../data/SampleQuestions";

export const groupByCategory = (data: SampleQuestion[]) => {
  return data.reduce<Record<string, SampleQuestion[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};
