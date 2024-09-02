import type { EntityManager } from "typeorm";
import type { AbstractTinyUrl } from "./entities/AbstractTinyUrl";
import type { GenerateTinyUrlOptions } from "./GenerateTinyUrlOptions";
import { InvalidTinyUrlException } from "./InvalidTinyUrlException";
import type { TinyUrl } from "./entities/TinyUrl";
import { randomUrlSafeBase64String } from "./CryptoGeneratorUtil";

export async function generateTinyUrl<T extends typeof AbstractTinyUrl>(
  manager: EntityManager,
  isLocalDevelopment: boolean,
  { entityClass, tinyUrl, codeLength, entityId }: GenerateTinyUrlOptions<T>
): Promise<Required<TinyUrl>> {
  const newTinyUrlShortUrl = randomUrlSafeBase64String(codeLength);

  const existingTinyUrl = await findTinyUrl(
    manager,
    entityClass,
    newTinyUrlShortUrl
  );
  const baseUrl = extractBaseUrl(tinyUrl.longUrl, isLocalDevelopment);

  const shortUrl = `${baseUrl}/${newTinyUrlShortUrl}`;

  if (!existingTinyUrl) {
    await manager.save(entityClass, {
      entityId,
      longUrl: tinyUrl.longUrl,
      shortUrl,
    });

    return { longUrl: tinyUrl.longUrl, shortUrl };
  }

  return generateTinyUrl(manager, isLocalDevelopment, {
    entityClass,
    tinyUrl,
    codeLength,
    entityId,
  });
}

function extractBaseUrl(
  longUrl: string,
  isLocalDevelopment: boolean
): string | null {
  try {
    const url = new URL(longUrl);
    const hostName = isLocalDevelopment
      ? `${url.hostname}:${url.port}`
      : url.hostname;
    return `${url.protocol}//${hostName}`;
  } catch (error) {
    throw new InvalidTinyUrlException(`Invalid longUrl: ${error}`, { longUrl });
  }
}

async function findTinyUrl<T extends typeof AbstractTinyUrl>(
  manager: EntityManager,
  entityClass: T,
  newTinyUrlShortUrl: string
): Promise<TinyUrl | null> {
  const tinyUrl = await manager.findOne(entityClass, {
    select: {
      shortUrl: true,
      longUrl: true,
    },
    where: {
      shortUrl: newTinyUrlShortUrl,
    },
  });
  return tinyUrl
    ? { shortUrl: tinyUrl.shortUrl, longUrl: tinyUrl.longUrl }
    : null;
}

export function isValidUrl(url: string): boolean {
  const urlRegex = /^(http|https):\/\/[^ "]+$/;

  return urlRegex.test(url);
}
