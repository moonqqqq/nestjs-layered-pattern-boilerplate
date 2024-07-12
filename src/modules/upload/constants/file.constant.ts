export const FILE_MIMETYPE = {
  IMAGE_PNG: 'image/png',
} as const;

export type TFILE_MIMETYPE = (typeof FILE_MIMETYPE)[keyof typeof FILE_MIMETYPE];
