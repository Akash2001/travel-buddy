export const PlacesList = ({ places }) => {
    if (!places || places.length === 0) {
        return (
            <div className="w-96 h-64 flex items-center justify-center border rounded-lg bg-gray-50">
                <p className="text-gray-500">No places found</p>
            </div>
        );
    }

    return (
        <div className="w-96 h-64 overflow-y-auto border rounded-lg bg-white shadow">
            <ul>
                {places.map((place) => (
                    <li
                        key={place.fsq_id}
                        className="p-3 border-b last:border-none hover:bg-gray-50 cursor-pointer"
                    >
                        <h2 className="font-semibold">{place.name}</h2>
                        <p className="text-sm text-gray-600">
                            {place.location.address || "No address available"}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
