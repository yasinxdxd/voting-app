import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from "./pages/SignIn.js";
import { SignUp } from "./pages/SignUp.js";
import { Home } from "./pages/Home.js";

import { Profile } from "./pages/Profile.js";
import { EditProfile } from "./pages/EditProfile.js";
import { AboutUs } from "./pages/AboutUs.js";
import { AdminSignIn } from "./pages/AdminSignIn.js";
import { AdminHome } from "./pages/AdminHome.js";
import { Index } from "./pages/index.js";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} /> 
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/aboutus" element={<AboutUs />} />

                <Route path="/admin/signin" element={<AdminSignIn />} />
                <Route path="/admin/home" element={<AdminHome />} />

            </Routes>
        </Router>
    );
};
export default App;
