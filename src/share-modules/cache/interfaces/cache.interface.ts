export abstract class ICacheService {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: any) => Promise<'OK' | null>;
  setex: (key: string, seconds: number | string, value: any) => Promise<'OK'>;
  del: (key: string) => Promise<void>;
}
