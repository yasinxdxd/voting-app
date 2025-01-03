import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { Background } from "../components/Background";
import { Navbar } from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";
import CityCountySelector from "../components/CityCountySelector";

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    tc_no: "",
    first_name: "",
    last_name: "",
    birthdate: null,
    gender: "",
    phone_number: null,
    residence: {city_id: "", county_id: "", address: ""},
    created_at: "",
    profileImage: "/images/profile.png",
  });

  const navigate = useNavigate();
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
            navigate('/unauthorized');
            throw new Error("Failed to fetch user data");
          }
  
          const data = await response.json();
          setFormData(data.record); // Update userData with the response
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };
  
      fetchData();
    }, []);

  const [profileImage, setProfileImage] = useState("/images/profile.png");
  const [isHovered, setIsHovered] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: (name === "birthdate" && value !== null)
                ? value.split("T")[0] // Ensure the correct format
              : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log(formData);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/set/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_VOTING_API_BACKEND_KEY,
          },
          body: JSON.stringify(formData),
          credentials: "include", // Include session cookies
        });

        if (response.ok) {
          navigate('/profile');
        } else {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setFormData(data.record); // Update userData with the response
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  };

  return (
    <Background>
      <Navbar />
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className=" bg-gray-600	 max-w-6xl mx-auto bg-card rounded-lg shadow-sm p-8 md:p-8">
        <h1 className="text-3xl font-bold text-white text-center">Edit Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="relative w-48 h-48 rounded-full overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80";
                }}
              />
              {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                  <label htmlFor="profilePicture" className="cursor-pointer">
                    <FaCamera className="text-4xl text-white" />
                    <span className="text-white block mt-2">Change Picture</span>
                  </label>
                </div>
              )}
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="text-white block text-body font-body text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="text-white block text-body font-body text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="phone_number" className="text-white block text-body font-body text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>

                <div>
                  <label htmlFor="birthdate" className="text-white block text-body font-body text-foreground mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    required
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>

                <CityCountySelector
                  residence={formData.residence}
                  setFormData={setFormData}
                />

                {/* <div className="md:col-span-2">
                  <label htmlFor="address" className="text-white block text-body font-body text-foreground mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  ></textarea>
                </div> */}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white px-6 py-2 font-bold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
    </Background>
  );
};

