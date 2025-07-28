import { useState } from 'react';
import api from '../apis/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

export const SignupPage = ()=>{
    const [form,setForm] = useState({name:'',email:'',password:''});
    const [error,setError] = useState('');

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await api.post('/api/auth/signup',form);
            localStorage.setItem("accessToken",res.data.accessToken);
            toast.success("Signup Successfully");
        }catch(err){
            setError('signup failed');
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">SignUp</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder='Name' onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="email" name='email' placeholder='Email' onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="password" name='password' placeholder='Password' onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <button type='submit' className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
                    >SignUp</button>
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}   
