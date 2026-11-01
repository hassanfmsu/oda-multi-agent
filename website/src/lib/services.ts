import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Service = CollectionEntry<'services'>;

export async function getServices(lang: Lang): Promise<Service[]> {
  const entries = await getCollection('services', ({ id }) => id.startsWith(`${lang}/`));
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** 'en/oracle-fusion-erp' -> 'oracle-fusion-erp' */
export const slugOf = (service: Service) => service.id.slice(service.id.indexOf('/') + 1);
