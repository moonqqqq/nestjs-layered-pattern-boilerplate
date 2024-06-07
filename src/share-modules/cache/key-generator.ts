// Better to change static class?

import { CACHE_KEY, CACHE_KEY_TYPES } from './cache.constants';

const prefix = 'service-specific-prefix';

function _keyGenerator(type: CACHE_KEY_TYPES, _key: string) {
  return `${prefix}:${type}:${_key}`;
}

export function getOtpKey(phoneNumber: string) {
  return _keyGenerator(CACHE_KEY.OTP, phoneNumber);
}

export function getSignupablePhoneNumberKey(phoneNumber: string) {
  return _keyGenerator(CACHE_KEY.SIGNUPABLE_PHONE_NUMBER, phoneNumber);
}

export function getOtpSentCountKey(phoneNumber: string) {
  return _keyGenerator(CACHE_KEY.SIGNUPABLE_PHONE_NUMBER, phoneNumber);
}
