import { api } from ".";

export const searchPlaces = async (params) => {
    return await api.get("/foursquare/search", { params });
};