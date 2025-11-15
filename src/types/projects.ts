import type { CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"project">;

export interface ProjectFilters {
  status: string | null;
  year: string | null;
  tech: string | null;
  tag: string | null;
}
