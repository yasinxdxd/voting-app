import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from "./pages/SignIn.js";
import { SignUp } from "./pages/SignUp.js";
import { Home } from "./pages/Home.js";
import { Profile } from "./pages/Profile.js";
import { EditProfile } from "./pages/EditProfile.js";
import { AboutUs } from "./pages/AboutUs.js";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
        </Router>
    );
};
export default App;
