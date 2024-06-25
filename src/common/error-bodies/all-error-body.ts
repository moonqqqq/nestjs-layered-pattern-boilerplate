import { AuthErrorBody } from '../error-bodies/auth-error-body';
import { InternalErrorBody } from '../error-bodies/internal-error-body';
import { BadInputErrorBody } from './bad-input-error-body';

export const ALL_ERROR_BODY = {
  ...AuthErrorBody,
  ...InternalErrorBody,
  ...BadInputErrorBody,
} as const;
