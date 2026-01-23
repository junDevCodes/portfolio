import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
  }),
});

const knowledgeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['electronics', 'cs', 'english', 'embedded']),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  knowledge: knowledgeCollection,
};
