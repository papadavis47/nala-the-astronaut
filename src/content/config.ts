import { defineCollection, z } from 'astro:content';

const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    pubDate: z.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'notes': notesCollection,
};
