import React, { useState } from "react";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { Background } from "../components/Background";
import { Link } from "react-router-dom"; 

export const Index = () => {
  const [isHoveredRegister, setIsHoveredRegister] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);

  return (
    <Background>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-gray-300 rounded-lg shadow-lg p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Online Voting System</h1>
            <p className="bg-fuchsia-900 text-white text-muted-foreground">Secure and Easy Voting Platform</p>
          </div>

          <div className="space-y-4">
            <Link
              to="/signup" 
              className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-md transition-all duration-300 ${isHoveredRegister ? 'bg-fuchsia-900 text-white transform scale-105' : 'bg-secondary text-foreground'}`}
              onMouseEnter={() => setIsHoveredRegister(true)}
              onMouseLeave={() => setIsHoveredRegister(false)}
            >
              <FaUserPlus className="text-xl" />
              <span className="font-medium">Register</span>
            </Link>

            <Link
              to="/signin"
              className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-md transition-all duration-300 ${isHoveredLogin ? 'bg-fuchsia-900 text-white transform scale-105' : 'bg-secondary text-foreground'}`}
              onMouseEnter={() => setIsHoveredLogin(true)}
              onMouseLeave={() => setIsHoveredLogin(false)}
            >
              <FaSignInAlt className="text-xl" />
              <span className="font-medium">Sign in</span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Welcome to our secure voting platform
            </p>
          </div>
        </div>

        <footer className="mt-8 text-center text-white text-sm">
          <p>© 2024 Online Voting System. All rights reserved.</p>
        </footer>
      </div>
    </Background>
  );
};
