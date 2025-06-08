export const INITIAL_MESSAGES = [
  {
    id: 1,
    text: `Hello! I'm **Whispr**, your personal AI chatbot. How can I assist you today?

## ✨ Rich Text Support ✨
I support rich formatting like:

- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- Numbered lists and bullet points
- ### Headings and ~~strikethrough~~

Try asking me technical questions and I'll respond with **beautifully formatted** answers! 🚀`,
    sender: "bot",
    timestamp: new Date(),
  },
];

export const MESSAGE_CONFIG = {
  LONG_MESSAGE_THRESHOLD: 200,
  CODE_KEYWORDS: ["```", "function", "class", "import", "const", "let", "var"],
  PREVIEW_LENGTH: 160,
};

export const UI_CONFIG = {
  SCROLL_THRESHOLD: 100,
  COPY_SUCCESS_DURATION: 2000,
  HEADER_HEIGHT: "80px",
  INPUT_HEIGHT: "120px",
};
