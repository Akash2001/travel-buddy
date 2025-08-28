import { useState } from "react";
import { FaFilter } from "react-icons/fa";

export const FiltersPanel = ({ onApply }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("all");
    const [radius, setRadius] = useState(10000);
    const [sort, setSort] = useState("relevance");
    const [openNow, setOpenNow] = useState(false);

    const handleApply = () => {
        onApply({ sort, radius });
        setIsOpen(false);
    };

    const handleToggle = () => {
        setOpenNow(!openNow);
    };

    return (
        <div>
            {/* Filter Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                <FaFilter />
                <span>Filters</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white w-80 p-6 rounded-lg shadow-lg space-y-4">
                        <h2 className="text-xl font-semibold">Filters</h2>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Sort by</label>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="rating">Rating</option>
                                <option value="distance">Distance</option>
                            </select>
                        </div>

                        {/* Open Now Toggle */}
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Open Now
                            </label>
                            <input
                                id="openNow"
                                type="checkbox"
                                checked={openNow || false}
                                onChange={handleToggle}
                                className="w-5 h-5 cursor-pointer accent-blue-500"
                            />
                        </div>

                        {/* Radius */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Distance (meters)
                            </label>
                            <input
                                type="number"
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                                className="w-full border rounded p-2"
                                min="100"
                                step="100"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
