export const extractCode = (text = '') => {
  const match = text.match(/```(?:\w+)?\n?([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
};
