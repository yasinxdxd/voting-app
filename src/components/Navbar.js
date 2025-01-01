import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for programmatic navigation
import {
  FaHome,
  FaChartBar,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaEdit,
  FaVoteYea as FaBallot,
} from "react-icons/fa";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation after logout

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navLinks = [
    { name: "Home", icon: <FaHome className="mr-2" />, to: "/home" },
    { name: "Results", icon: <FaChartBar className="mr-2" />, to: "/results" },
    { name: "About Us", icon: <FaInfoCircle className="mr-2" />, to: "/aboutus" },
    { name: "Contact", icon: <FaEnvelope className="mr-2" />, to: "/contact" },
  ];

  const userMenuItems = [
    { name: "Profile", icon: <FaUserCircle className="mr-2" />, to: "/profile" },
    { name: "Edit Profile", icon: <FaEdit className="mr-2" />, to: "/editprofile" },
    {
      name: "Logout",
      icon: <FaSignOutAlt className="mr-2" />,
      to: "/signin",
      onClick: async () => {
        try {
          // Send the GET request to logout
          const response = await fetch("http://localhost:5000/auth/logout", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.REACT_APP_VOTING_API_BACKEND_KEY,
            },
            credentials: "include",
          });

          if (response.ok) {
            // Successfully logged out, perform actions like redirecting to login page
            navigate("/signin"); // Redirect to the login page after successful logout
          } else {
            // Handle error if needed
            console.error("Logout failed.");
          }
        } catch (error) {
          console.error("Error during logout:", error);
        }
      },
    },
  ];

  return (
    <nav className="w-full z-50 bg-fuchsia-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer">
            <FaBallot className="h-8 w-8 text-purple-200" />
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to} // Link bileşeni ile yönlendirme yapılır
                className="flex items-center text-purple-200 hover:text-purple-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-purple-200 hover:text-purple-100 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
              >
                <FaUserCircle className="h-6 w-6" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-fuchsia-950 ring-1 ring-black ring-opacity-5">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to} // Kullanıcı menüsünde de yönlendirme yapılır
                      className="flex items-center w-full px-4 py-2 text-sm text-purple-200 hover:bg-gray-600"
                      onClick={item.onClick} // Apply the onClick for the logout button
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-purple-100 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-purple-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to} // Yine Link ile yönlendirme
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-purple-100 hover:bg-purple-600"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {userMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-purple-200 hover:text-purple-100 hover:bg-purple-600"
                onClick={item.onClick} // Apply the onClick for the logout button
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
