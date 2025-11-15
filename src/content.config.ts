// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import { date } from "astro:schema";
import { a, desc, g, summary } from "motion/react-client";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});

const project = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/project" }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      summary: z.string(),
      description: z.string(),
      status: z.enum(['ongoing', 'completed', 'paused']),
      startDate: z.date(),
      endDate: z.date().optional(),
      lastUpdated: z.date().optional(),
      technologies: z.array(z.string()),
      tags: z.array(z.string()),
      roles: z.array(z.string()),
      client: z.string().optional(),
      contributors: z.array(z.string()).optional(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      gallery: z.array(z.object({
        url: z.string(),
        alt: z.string()
      })).optional()
    })
});

const post = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/post" }),
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      summary: z.string(),
      description: z.string(),
      date: z.date(),
      updated: z.date().optional(),
      project: z.string(),
      categories: z.array(z.string()),
      tags: z.array(z.string()),
      authors: z.array(z.string()).optional(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      gallery: z.array(z.object({
        url: z.string(),
        alt: z.string()
      })).optional()
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog, project, post };