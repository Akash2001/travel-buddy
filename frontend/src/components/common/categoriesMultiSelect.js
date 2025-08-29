import { useState } from "react";
import { categories } from "../../utils/categories";

export default function CategoryDropdown({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const toggleCategory = (id) => {
    let newSelected;
    if (selected.includes(id)) {
      newSelected = selected.filter((c) => c !== id);
    } else {
      newSelected = [...selected, id];
    }
    setSelected(newSelected);
    onChange(newSelected);
  };

  const filteredCategories = categories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-72">
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full border p-2 rounded-lg bg-white flex justify-between items-center"
      >
        <span>
          {selected.length > 0
            ? `${selected.length} selected`
            : "Select interests"}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full border px-2 py-1 rounded mb-2 focus:outline-none"
            />
            {filteredCategories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center space-x-2 p-1 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
