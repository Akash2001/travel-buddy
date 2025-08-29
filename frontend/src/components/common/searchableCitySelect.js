import React, { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableCitySelect({
  options = [],
  placeholder = "Select a city…",
  value = null,
  onChange = () => { },
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  // Filter options based on query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(o => o.city.toLowerCase().includes(q));
  }, [options, query]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Reset highlight when list changes or opens
  useEffect(() => {
    setHighlight(0);
  }, [open, query]);

  const selectOption = (opt) => {
    onChange(opt);
    setQuery(opt.city);
    setOpen(false);
    // keep focus on input for quick changes
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((i) =>
        (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlight]) selectOption(filtered[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Keep input text in sync with selected value on mount/prop changes
  useEffect(() => {
    if (value && !query) setQuery(value.city);
  }, [value]); // eslint-disable-line

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-72 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          aria-autocomplete="list"
          aria-controls="city-listbox"
        />
      </div>
      {open && (
        <ul
          id="city-listbox"
          role="listbox"
          className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow"
        >
          {filtered.length === 0 ? (
            <li className="p-2 text-sm text-gray-500">No matches</li>
          ) : (
            filtered.map((opt, idx) => (
              <li
                key={opt.city}
                role="option"
                aria-selected={idx === highlight}
                onMouseDown={(e) => e.preventDefault()} // keep focus
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setHighlight(idx)}
                className={`cursor-pointer p-2 ${idx === highlight ? "bg-blue-50" : "bg-white"
                  } hover:bg-blue-50`}
              >
                <div className="font-medium">{opt.city}</div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
