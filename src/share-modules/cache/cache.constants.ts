export const CACHE_KEY = {
  OTP: 'otp',
  SIGNUPABLE_PHONE_NUMBER: 'signupable-phone',
  OTP_SENT_COUNT: 'otp-sent-count',
} as const;

export type CACHE_KEY_TYPES = (typeof CACHE_KEY)[keyof typeof CACHE_KEY];

export const CACHE_TTL = {
  OTP: 60 * 3,
  SIGNUPABLE_PHONE_NUMBER: 60 * 10,
} as const;

export type CACHE_TTL_TYPE = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];
