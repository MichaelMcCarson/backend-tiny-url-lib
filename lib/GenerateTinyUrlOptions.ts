import type { AbstractTinyUrl } from "./entities/AbstractTinyUrl";
import type { TinyUrl } from "./entities/TinyUrl";

export interface GenerateTinyUrlOptions<T extends typeof AbstractTinyUrl> {
  entityClass: T;
  tinyUrl: Partial<TinyUrl> & Pick<TinyUrl, "longUrl">;
  codeLength: number;
  entityId?: string;
}
