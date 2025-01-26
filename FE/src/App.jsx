import { Routes, Route } from "react-router-dom";
import Footer from "./components/shared/footer";
import Navbar from "./components/shared/navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./components/course/coursePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// Temporary placeholder components
const Home = () => <h1 className="text-2xl font-bold">Home Page</h1>;
const About = () => <h1 className="text-2xl font-bold">About Page</h1>;
const Profile = () => <h1 className="text-2xl font-bold">Profile Page</h1>;

export default App;
