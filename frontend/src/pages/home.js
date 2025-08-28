import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlaces } from "../api/fsq";
import { PlacesList } from "../components/places/placesList";
import { FiltersPanel } from "../components/places/filtersPanel";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({ sort: "relevance", radius: 10000 });
  const [loading, setLoading] = useState(false);

  // Example static page list
  const pages = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
    { name: "Destinations", path: "/destinations" },
  ];

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = pages.filter((page) =>
      page.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return
    setLoading(true);
    const res = await searchPlaces({query, ...filters});
    if (res.status === 200) setPlaces(res.data);
    setLoading(false);
  }

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="flex flex-col items-center mt-10 flex-grow">
      <h1 className="text-3xl font-bold mb-6">Welcome to TravelBuddy</h1>
      <div className="relative w-full max-w-md flex items-center justify-between">
        <div className="relative w-80">
          <input
            type="text"
            value={query}
            onChange={handleSearchInput}
            onKeyDown={handleSearch}
            placeholder="Search pages..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          {results.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {results.map((page, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(page.path)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {page.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <FiltersPanel onApply={setFilters} />
      </div>
      <PlacesList places={places} loading={loading} />
    </div>
  );
}
