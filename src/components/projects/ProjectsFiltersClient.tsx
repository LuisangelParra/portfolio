/** @jsxImportSource react */
import React, { useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";
import FilterDropdown from "./filters/FilterDropdown";

type ProjectEntry = CollectionEntry<"project">;

interface Props {
  projects: ProjectEntry[];
}

const unique = (arr: string[]) => [...new Set(arr)].sort();

const ProjectsFiltersClient: React.FC<Props> = ({ projects }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [tech, setTech] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Valores posibles de cada filtro
  const statuses = useMemo(
    () => unique(projects.map((p) => p.data.status)),
    [projects]
  );

  const years = useMemo(
    () =>
      unique(
        projects.flatMap((p) => {
          const s = new Date(p.data.startDate).getFullYear().toString();
          const e = p.data.endDate
            ? new Date(p.data.endDate).getFullYear().toString()
            : s;
          return [s, e];
        })
      ),
    [projects]
  );

  const technologies = useMemo(
    () => unique(projects.flatMap((p) => p.data.technologies ?? [])),
    [projects]
  );

  const tags = useMemo(
    () => unique(projects.flatMap((p) => p.data.tags ?? [])),
    [projects]
  );

  // Filtrado progresivo
  const filteredProjects = useMemo(
    () =>
      projects
        .filter((p) => !status || p.data.status === status)
        .filter((p) => {
          if (!year) return true;
          const y = Number(year);
          const start = new Date(p.data.startDate).getFullYear();
          const end = p.data.endDate
            ? new Date(p.data.endDate).getFullYear()
            : start;
          return y >= start && y <= end;
        })
        .filter((p) => !tech || p.data.technologies?.includes(tech))
        .filter((p) => !tag || p.data.tags?.includes(tag)),
    [projects, status, year, tech, tag]
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-6 my-8">
        <FilterDropdown
          label="Status"
          options={statuses}
          value={status}
          onSelect={setStatus}
          isOpen={openDropdown === "status"}
          onToggle={() => toggleDropdown("status")}
        />

        <FilterDropdown
          label="Year"
          options={years}
          value={year}
          onSelect={setYear}
          isOpen={openDropdown === "year"}
          onToggle={() => toggleDropdown("year")}
        />

        <FilterDropdown
          label="Tech"
          options={technologies}
          value={tech}
          onSelect={setTech}
          isOpen={openDropdown === "tech"}
          onToggle={() => toggleDropdown("tech")}
        />

        <FilterDropdown
          label="Tags"
          options={tags}
          value={tag}
          onSelect={setTag}
          isOpen={openDropdown === "tag"}
          onToggle={() => toggleDropdown("tag")}
        />
      </div>

      {/* Grid de proyectos (mismo estilo que ProjectGrid) */}
      <ul className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
        {filteredProjects.map((project) => {
          const data = project.data;
          return (
            <li
              key={project.id}
              className="group bg-zinc-900/40 border border-zinc-800/50 rounded-xl overflow-hidden shadow-md transition duration-300 hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden">
                <img
                  src={data.image.url}
                  alt={data.image.alt || data.title}
                  className="object-cover w-full h-60 sm:h-56 md:h-60 lg:h-64 transition duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-black/60 text-white tracking-wide uppercase backdrop-blur">
                  {data.status}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-zinc-100 mb-1">
                  {data.title}
                </h2>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-3">
                  {data.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {data.technologies.slice(0, 3).map((techItem) => (
                    <span
                      key={techItem}
                      className="px-2 py-1 bg-zinc-800/70 border border-zinc-700/50 text-[11px] text-zinc-300 rounded-md"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <a
                    href={`/projects/${data.slug}/`}
                    className="text-sm text-zinc-300 hover:text-white transition flex items-center gap-1"
                  >
                    View Project
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectsFiltersClient;
