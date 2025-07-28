import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LogoutButton = ()=>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("accessToken");
        toast.success("Logged out Successfully");
        navigate("/")
    }
    return (
        <div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-200">Logout</button>
        </div>
    )
}
export default LogoutButton;