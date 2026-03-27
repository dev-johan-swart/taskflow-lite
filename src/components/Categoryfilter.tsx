import React from "react";

interface CategoryFilterProps {
  categories: string[];
  currentCategory: string;
  setCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = React.memo(
  ({ categories, currentCategory, setCategory }) => {
    if (categories.length === 0) return null;

    return (
      <div className="category-filter" role="group" aria-label="Filter by category">
        <span className="category-filter__label">Category:</span>
        <button
          className={`btn btn-filter ${currentCategory === "All" ? "btn-filter--active" : ""}`}
          onClick={() => setCategory("All")}
          aria-pressed={currentCategory === "All"}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-filter ${currentCategory === cat ? "btn-filter--active" : ""}`}
            onClick={() => setCategory(cat)}
            aria-pressed={currentCategory === cat}
          >
            🏷️ {cat}
          </button>
        ))}
      </div>
    );
  }
);

CategoryFilter.displayName = "CategoryFilter";
