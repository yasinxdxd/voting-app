import React, { useState } from "react";
import { FaUser, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaEdit,FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // useNavigate ekleyin
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Background } from "../components/Background";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Profile = () => {
  const navigate = useNavigate();
  const [showAllSurveys, setShowAllSurveys] = useState(false);
  const [userData] = useState({
    username: "John Smith",
    birthDate: "1990-05-15",
    telephone: "+1 (555) 123-4567",
    address: "123 Democracy Street, Voteville, VS 12345",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3",
    viewVotes: {
      "Favorite Action Movie": {
        vote: "The Dark Knight",
        options: ["The Dark Knight", "Inception", "Avengers: Endgame", "Mad Max: Fury Road"],
        results: { "The Dark Knight": 45, "Inception": 30, "Avengers: Endgame": 15, "Mad Max: Fury Road": 10 }
      },
      "Best Sci-Fi Movie": {
        vote: "Interstellar",
        options: ["Interstellar", "Blade Runner 2049", "The Matrix", "Arrival"],
        results: { "Interstellar": 40, "Blade Runner 2049": 25, "The Matrix": 20, "Arrival": 15 }
      },
      "Top Drama Film": {
        vote: "The Shawshank Redemption",
        options: ["The Shawshank Redemption", "The Godfather", "Forrest Gump", "Schindler's List"],
        results: { "The Shawshank Redemption": 50, "The Godfather": 30, "Forrest Gump": 12, "Schindler's List": 8 }
      },
      "Favorite Comedy": {
        vote: "The Grand Budapest Hotel",
        options: ["The Grand Budapest Hotel", "Superbad", "Bridesmaids", "The Hangover"],
        results: { "The Grand Budapest Hotel": 35, "Superbad": 25, "Bridesmaids": 22, "The Hangover": 18 }
      }
    }
  });

  const renderSurveyResults = (category, details) => {
    const data = {
      labels: Object.keys(details.results),
      datasets: [
        {
          label: "Votes",
          data: Object.values(details.results),
          backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#FFC107"],
        },
      ],
    };

    return (
      <div key={category} className="mb-6 bg-gray-100 p-6 rounded " >
        <h4 className="text-lg font-semibold text-gray-900 mb-4 normal-case ">{category}</h4>
        <div style={{ height: "200px", width: "100%" }}>
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top"
                }
              }
            }}
          />
        </div>
        <p className="mt-4 text-gray-700">
          My Vote: <span className="font-bold text-purple-900">{details.vote}</span>
        </p>
      </div>
    );
  };

  const handleEditProfile = () => {
    navigate("/editProfile"); 
  };
  const viewVotes = Object.entries(userData.viewVotes);
  const initialSurveys = viewVotes.slice(0, 2);
  const remainingSurveys = viewVotes.slice(2);

  return (
    <Background >
      <div className="min-h-screen p-6 ">
        <h1 className="text-4xl font-bold text-white text-center mb-10">Profile</h1>
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-pink-300 grid md:grid-cols-2">
            <div className="bg-fuchsia-200 space-y-6 " >
              <h2 className="text-3xl font-bold text-gray-900 text-center">My Profile</h2>
              <div className="flex justify-center mb-6">
                <img 
                  src={userData.profileImage} 
                  alt="Profile" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-purple-900"
                />
              </div>
              <div className="space-y-4 bg-fuchsia-200 p-6 rounded">
                <div className="flex items-center gap-4">
                  <FaUser className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Username</p>
                    <p className="text-gray-900">{userData.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaBirthdayCake className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Birth Date</p>
                    <p className="text-gray-900">{userData.birthDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Telephone</p>
                    <p className="text-gray-900">{userData.telephone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-gray-600 text-xl" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 ">Address</p>
                    <p className="text-gray-900">{userData.address}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditProfile}
                className="flex items-center justify-center gap-2 bg-purple-900 text-white px-6 py-3 rounded-lg hover:bg-purple-400 transition-colors duration-300 shadow-lg hover:shadow-xl font-semibold text-lg ml-44 z-10 relative"
              >
                <FaEdit className="text-xl" />
                Edit Profile
              </button>
            </div>

            <div className="bg-fuchsia-300 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 text-center">Previous Votes</h2>
              <div className="space-y-6 px-6">
              {initialSurveys.map(([category, details]) => 
                renderSurveyResults(category, details)
                )}
                 {showAllSurveys && (
                <div className="space-y-6">
                  {remainingSurveys.map(([category, details]) => 
                    renderSurveyResults(category, details)
                  )}
                </div>
              )}
                {showAllSurveys && (
                <div className="space-y-6">
                  {remainingSurveys.map(([category, details]) => 
                    renderSurveyResults(category, details)
                  )}
                </div>
              )}

              {!showAllSurveys && remainingSurveys.length > 0 && (
                <button
                  onClick={() => setShowAllSurveys(true)}
                  className="w-full flex items-center justify-center gap-2 bg-purple-900 text-white px-6 py-3 rounded-lg 
                  hover:bg-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  Show More <FaAngleDown className="text-xl" />
                </button>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
