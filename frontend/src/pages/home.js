import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlaces } from "../api/fsq";
import { PlacesList } from "../components/places/placesList";
import { FiltersPanel } from "../components/places/filtersPanel";

export default function Home({ location }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({ sort: "relevance", limit: 5, radius: 10000, ll: location ? `${location.lat},${location.lng}` : undefined });
  const [loading, setLoading] = useState(false);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return
    setLoading(true);
    const res = await searchPlaces({ query, ...filters });
    if (res.status === 200) setPlaces(res.data);
    setLoading(false);
  }

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
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
        </div>
        <FiltersPanel onApply={setFilters} />
      </div>
      <PlacesList places={places} loading={loading} />
    </div>
  );
}
