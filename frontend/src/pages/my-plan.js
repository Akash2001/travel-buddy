import React, { useState } from "react";
import SearchableCitySelect from "../components/common/searchableCitySelect";
import { cities } from "../utils/cities";
import { searchPlaces } from "../api/fsq";
import { Recommendation } from "../components/plan/recommendation";

const topTouristCities = cities

export default function MyPlan({ user, location }) {
  const [selected, setSelected] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [personalizedRecs, setPersonalizedRecs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlan = async () => {
    if (!selected) return;
    setLoading(true);
    const res = await searchPlaces({ ll: `${selected.lat},${selected.lng}`, limit: 10, radius: 100000, sort: 'rating' });
    const resPersonalized = await searchPlaces({
      ll: `${selected.lat},${selected.lng}`, limit: 10, radius: 100000, sort:
        'rating', fsq_category_ids: user?.categories?.join(',')
    });
    if (res.status === 200) setRecommendations(res.data);
    if (resPersonalized.status === 200) setPersonalizedRecs(resPersonalized.data);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center mt-10 flex-grow">
      <h1 className="text-3xl font-bold text-center mb-6">My Travel Plan</h1>

      <div className="flex justify-center mb-6">
        <SearchableCitySelect
          options={topTouristCities}
          value={selected}
          onChange={setSelected}
          placeholder="Search or select a city…"
        />
        <button
          type="button"
          className="px-3 py-2 ml-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          aria-label="Toggle city list"
          onClick={getPlan}
        >
          Submit
        </button>
      </div>

      <div className="w-full max-h-[calc(100vh-450px)] px-6">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Personalized Plan */}
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-center mb-4">Personalized Plan</h4>
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalizedRecs.map((place) => (
                <Recommendation key={place.fsq_id} place={place} />
              ))}
            </div>
          </div>

          {/* Popular Plan */}
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-center mb-4">Popular Plan</h4>
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((place) => (
                <Recommendation key={place.fsq_id} place={place} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
