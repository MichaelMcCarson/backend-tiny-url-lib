import type { TinyUrl } from "./entities/TinyUrl";

export class InvalidTinyUrlException extends Error {
  readonly reason?: string;
  readonly tinyUrl?: Partial<TinyUrl>;

  constructor(reason: Error | string, tinyUrl?: Partial<TinyUrl>) {
    if (typeof reason === "string") {
      super("FAILED", new Error(reason));
      this.reason = reason;
    } else {
      super("INTERNAL SERVER ERROR", reason);
    }
    this.tinyUrl = tinyUrl;
  }
}

InvalidTinyUrlException.prototype.name = InvalidTinyUrlException.name;
