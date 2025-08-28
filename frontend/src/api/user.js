import { api } from ".";

export const login = async (data) => {
    return await api.post("/user/login", data);
};

export const signup = async (data) => {
    return await api.post("/user/signup", data);
};