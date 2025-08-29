import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api/user";
import Loader from "../components/common/loader";

export default function Login({ setUser }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const res = await login(form);
        if (res.data && res.data.success) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
        }else alert(res.data.message || "Login failed");
        setLoading(false)
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 flex-grow">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="bg-white p-6 rounded-2xl shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                            >
                                Login
                            </button>
                        </form>
                        {/* Signup Link */}
                        <p className="text-sm text-gray-600 text-center mt-4">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
