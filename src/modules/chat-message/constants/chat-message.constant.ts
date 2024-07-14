export const CHAT_MESSAGE_KIND = {
  TEXT: 'TEXT',
  STICKER: 'STICKER',
} as const;

export type TCHAT_MESSAGE_KIND =
  (typeof CHAT_MESSAGE_KIND)[keyof typeof CHAT_MESSAGE_KIND];
