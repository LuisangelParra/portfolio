/** @jsxImportSource react */
import React from "react";

interface Props {
  label: string;
  value: string | null;
  options: string[];
  onSelect: (v: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterDropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
}) => {
  const handleSelect = (v: string | null) => {
    onSelect(v);
    onToggle(); // cerrar al seleccionar
  };

  return (
    <div className="relative inline-block">
      <span className="text-xs font-medium text-zinc-500 mr-1">{label}:</span>

      <button
        type="button"
        onClick={onToggle}
        className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 
                   text-zinc-300 text-sm flex items-center gap-1 hover:border-zinc-600"
      >
        {value || "All"} <span className="opacity-70">▾</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-44 rounded-md border border-zinc-800 
                        bg-zinc-900/90 shadow-xl backdrop-blur-xl z-30 p-1">
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className="block w-full text-left px-3 py-1.5 rounded text-sm text-zinc-300 hover:bg-zinc-800"
          >
            All
          </button>

          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className={`block w-full text-left px-3 py-1.5 rounded text-sm transition
                ${
                  value === opt
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
                }
              `}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
