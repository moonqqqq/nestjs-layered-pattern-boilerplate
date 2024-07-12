export const CHATROOM_KIND = {
  ONE_TO_ONE: 'ONE_TO_ONE',
  GROUP: 'GROUP',
} as const;

export type TCHATROOM_KIND = (typeof CHATROOM_KIND)[keyof typeof CHATROOM_KIND];
