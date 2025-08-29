import Loader from "../common/loader";

export const PlacesList = ({ places, loading }) => {

    const formatDistance = (distance) => {
        if (!distance) return null;
        if (distance < 1000) {
            return `${Math.round(distance)} m`;
        }
        return `${(distance / 1000).toFixed(1)} km`;
    }

    return (
        <div className={`w-[28rem] flex max-h-[calc(100vh-300px)] overflow-y-auto my-10 ${places && places.length > 0 ? 'border rounded-lg' : ''}`}>
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
                                    {/* Name */}
                                    <h2 className="font-semibold">{place.name}</h2>

                                    {/* Address */}
                                    <p className="text-sm text-gray-600">
                                        {place.location?.formatted_address || "No address available"}
                                    </p>

                                    {/* Distance */}
                                    {place.distance && (
                                        <p className="text-sm text-gray-500">Distance: {formatDistance(place.distance)}</p>
                                    )}

                                    {/* Contact Info */}
                                    {place.tel && <p className="text-sm text-gray-500">📞 {place.tel}</p>}
                                    {place.email && <p className="text-sm text-gray-500">✉️ {place.email}</p>}
                                    {place.website && (
                                        <a
                                            href={place.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 text-sm"
                                        >
                                            Visit Website
                                        </a>
                                    )}

                                    {/* Social Media */}
                                    {place.social_media && (
                                        <p className="text-sm text-gray-500">
                                            {Object.entries(place.social_media).map(([platform, link]) => (
                                                <a
                                                    key={platform}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mr-2 text-blue-500"
                                                >
                                                    {platform}
                                                </a>
                                            ))}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
