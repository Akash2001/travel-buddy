import React, { useState } from "react";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";
import CategoryMultiSelect from "../components/common/categoriesMultiSelect";


export default function Signup({ setUser }) {
    const [form, setForm] = useState({ name: "", email: "", password: "", categories: [] });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeCategories = (ids) => {
        setForm({ ...form, categories: ids });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(form); // call backend API
        if (res.data && res.data.success) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-center flex-grow bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <CategoryMultiSelect onChange={(ids) => handleChangeCategories(ids)} />
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
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}
