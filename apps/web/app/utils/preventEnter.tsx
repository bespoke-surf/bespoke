export const preventEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e?.key === "Enter") {
    e.preventDefault();
  }
};
