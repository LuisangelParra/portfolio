/** @jsxImportSource react */
import React, { useState, useMemo } from "react";
import BlogPostItem from "./BlogPostItem";
import type { CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"post">;
type ProjectEntry = CollectionEntry<"project">;

interface Props {
  posts: PostEntry[];
  projects: ProjectEntry[];
}

const BlogClient: React.FC<Props> = ({ posts, projects }) => {
  // categories
  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.data.categories ?? []))),
    [posts]
  );

  const [active, setActive] = useState<string>("All");

  // filtered posts
  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.data.categories?.includes(active));
  }, [posts, active]);

  return (
    <div>
      {/* FILTER PILLS */}
      <div className="flex items-center gap-4 mt-4 mb-10">
        <button
          onClick={() => setActive("All")}
          className={`px-4 py-1.5 rounded-full text-sm transition ${
            active === "All"
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              active === cat
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {filtered.map((post) => (
          <BlogPostItem
            key={post.id}
            post={post}
            projects={projects}   // ⬅️ aquí lo pasamos
          />
        ))}
      </div>
    </div>
  );
};

export default BlogClient;
