import { useEffect, useState } from "react";
import api from "../apis/api";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        api.get("/api/protected")
            .then((res) => setData(res.data.message))
            .catch((err) => {
                alert("Token expired or unauthorized");
                console.log(err.response?.data);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex flex-col items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome to Dashboard</h1>
                <p className="text-center text-gray-600 mb-4">{data}</p>
                <div className="flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
