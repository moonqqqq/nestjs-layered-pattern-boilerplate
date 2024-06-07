export abstract class ILoggerService {
  constructor() {}
  info: (data) => void;
  error: (err) => void;
  warn: (err) => void;
}
