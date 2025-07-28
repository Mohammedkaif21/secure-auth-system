import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import api from "../apis/api";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post('/api/auth/login', { email, password });
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log('Login Success', res.data);
            toast.success('Login Successfully');
            navigate("/dashboard");
        } catch (err) {
            console.error('Login Failed', err);
            setError(err.response?.data?.message || 'Login Failed');
        }
    }
    return (
        <div className = "min-h-screen bg-gray-100 flex items-center justify-center select-none">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Email" onChange={(e) => {
                        setEmail(e.target.value);
                        setError("")
                    }} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <label className="flex items-center space-x-2 mt-3 ms-2 text-sm text-gray-700">
                            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(prev => !prev)}className="accent-blue-600"/>
                            <span>{showPassword?"Hide Password" : "Show Password"}</span>
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition">LogIn</button>
                    <p className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Login





