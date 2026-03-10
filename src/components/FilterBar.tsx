import React from "react";
import type { FilterType } from "../types/task";

interface FilterBarProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, setFilter }) => {
  const filters: FilterType[] = ["All", "Active", "Completed"];
  return (
    <div>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{ fontWeight: f === currentFilter ? "bold" : "normal" }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};