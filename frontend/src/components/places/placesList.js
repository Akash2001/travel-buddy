import Loader from "../common/loader";

export const PlacesList = ({ places, loading }) => {
    return (
        <div className={`w-[28rem] flex flex-grow overflow-y-auto my-10 ${places && places.length > 0 ? 'border rounded-lg' : ''}`}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {(!places || places.length === 0) ? (
                        <p className="w-full text-center text-gray-500">No places found</p>
                    ) : (
                        <ul>
                            {places.map((place) => (
                                <li
                                    key={place.fsq_id}
                                    className="p-3 border-b last:border-none hover:bg-gray-50 cursor-pointer"
                                >
                                    <h2 className="font-semibold">{place.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        {place.location.formatted_address || "No address available"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
