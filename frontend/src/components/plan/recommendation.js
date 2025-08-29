export const Recommendation = ({ place }) => {
    return (
        <div
            key={place.fsq_id}
            className="p-3 border hover:bg-gray-50 cursor-pointer"
        >
            {/* Name */}
            <h2 className="font-semibold">{place.name}</h2>

            {/* Address */}
            <p className="text-sm text-gray-600">
                {place.location?.formatted_address || "No address available"}
            </p>

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
        </div>
    )
}