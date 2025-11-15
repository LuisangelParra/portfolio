/** @jsxImportSource react */
import React from "react";
import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"post">;
type ProjectEntry = CollectionEntry<"project">;

interface Props {
  post: PostEntry;
  projects: ProjectEntry[];
}

const BlogPostItem: React.FC<Props> = ({ post, projects }) => {
  const d = post.data;

  const dateFmt = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  // Find project by slug
  const project = projects.find((p) => p.data.slug === d.project);

  return (
    <div className="space-y-1.5 py-6 border-b border-zinc-800">
      <a
        href={`/blog/${d.slug}/`}
        className="text-2xl font-semibold text-zinc-100 hover:text-white underline-offset-4 hover:underline"
      >
        {d.title}
      </a>

      <p className="text-zinc-400 text-[15px]">{d.summary}</p>

      {/* metadata */}
      <p className="text-sm text-zinc-500 mt-1">
        {dateFmt(d.date)}
        {d.authors?.length ? ` · ${d.authors[0]}` : ""}
        {project ? ` · ${project.data.title}` : ""}
      </p>
    </div>
  );
};

export default BlogPostItem;
