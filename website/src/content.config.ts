import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per service and language:
//   src/content/services/en/<slug>.md
//   src/content/services/ar/<slug>.md   (same file name in both languages)
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pillar: z.enum(['ai', 'oracle']),
    icon: z.enum(['sparkle', 'agent', 'shield', 'erp', 'integration', 'paas', 'cloud', 'chat']),
    order: z.number(),
    highlights: z.array(z.string()).min(1),
  }),
});

export const collections = { services };
