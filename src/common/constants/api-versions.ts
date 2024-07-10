export const API_VERSION = {
  ONE: 'v1',
} as const;

export type API_VERSION_TYPES = (typeof API_VERSION)[keyof typeof API_VERSION];

export const API_ENDPOINT = {
  AUTH: 'auth',
  UPLOAD: 'upload',
  USER_PROFILE: 'user-profile',
  COMPANY: 'company',
  BATCH: 'batch',
} as const;
