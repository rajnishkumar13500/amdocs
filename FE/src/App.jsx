import { Routes, Route } from "react-router-dom";
import Footer from "./components/shared/footer";
import Navbar from "./components/shared/navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import CourseDetails from "./components/course/CourseDetails";
import Courses from "./components/course/coursePage";
import Details from "./components/userInfo/details";
import SkillInfo from "./components/userInfo/userSkillinfo";
import About from "./pages/about";
import Home from "./pages/home";
import UserDashboard from "./components/dashboard/userDashboard";
import AuthProctor from "./components/auth/authProctor";
import { Toaster } from "react-hot-toast";
import ShowProfile from "./components/userInfo/showProfile";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <AuthProctor>
                  <UserDashboard />
                </AuthProctor>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <AuthProctor>
                  <ShowProfile />
                </AuthProctor>
              }
            />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route
              path="/update-profile"
              element={
                <AuthProctor>
                  <Details />
                </AuthProctor>
              }
            />
            <Route
              path="/update-skills"
              element={
                <AuthProctor>
                  <SkillInfo />
                </AuthProctor>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
