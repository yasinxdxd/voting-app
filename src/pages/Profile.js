import React, { useState, useEffect } from "react";
import { FaUser, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaEdit,FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // useNavigate ekleyin
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Background } from "../components/Background";
import { Navbar } from "../components/Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Profile = () => {
  const navigate = useNavigate();
  // const [showAllSurveys, setShowAllSurveys] = useState(false);
  const [userData, setUserData] = useState({
    tc_no: "",
    first_name: "",
    last_name: "",
    birthdate: "",
    gender: "",
    phone_number: null,
    residence: {city: "", county: "", address: ""},
    created_at: "",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3",
  });

  const handleEditProfile = () => {
    navigate("/editProfile"); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_VOTING_API_BACKEND_KEY,
          },
          credentials: "include", // Include session cookies
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.record); // Update userData with the response
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Background >
      <Navbar />
      <div className="min-h-screen p-6 ">
        <h1 className="text-4xl font-bold text-white text-center mb-10">Profile</h1>
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-pink-300 grid md:grid-cols-2">
            <div className="bg-fuchsia-900 space-y-6 " >
              <h2 className="text-3xl font-bold text-white text-center">My Profile</h2>
              <div className="flex justify-center mb-6">
                <img 
                  src={userData.profileImage} 
                  alt="Profile" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-600"
                />
              </div>
              <div className="space-y-4 bg-fuchsia-200 p-6 rounded">
                <div className="flex items-center gap-4">
                  <FaUser className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">TC No</p>
                    <p className="text-gray-900">{userData.tc_no}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaUser className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Name</p>
                    <p className="text-gray-900">{userData.first_name} {userData.last_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaBirthdayCake className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Birth Date</p>
                    <p className="text-gray-900">{userData.birthdate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaBirthdayCake className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Gender</p>
                    <p className="text-gray-900">{userData.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Phone</p>
                    <p className="text-gray-900">{userData.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 ">Address</p>
                    {userData.residence != null ? 
                    <><p className="text-gray-900">{userData.residence.city}</p>
                    <p className="text-gray-900">{userData.residence.county}</p>
                    <p className="text-gray-900">{userData.residence.address}</p></>
                     : <></>}
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditProfile}
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-purple-400 transition-colors duration-300 shadow-lg hover:shadow-xl font-semibold text-lg ml-44 z-10 relative"
              >
                <FaEdit className="text-xl" />
                Edit Profile
              </button>
            </div>


          </div>
        </div>
      </div>
    </Background>
  );
};
