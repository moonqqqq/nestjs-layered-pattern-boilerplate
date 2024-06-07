export const FILE_ENUM = {
  IMAGE: 'image',
  FILE: 'file',
} as const;

export type FILE_ENUM_TYPE = (typeof FILE_ENUM)[keyof typeof FILE_ENUM];
