import PropTypes from "prop-types";
import { apiClient } from "../../api/api";
import { apiList } from "../../api/apilist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUserInfo } from "../auth/auth.service";

const CourseDescription = ({
  image,
  name,
  description,
  CourseStructure,
  Duration,
  Cost,
  Instructor,
  Prerequisites,
  id,
  Link,
}) => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleEnroll = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    try {
      const response = await apiClient.post(apiList.courseEnroll(id));
      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully enrolled in the course!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.success(
        error.response?.data?.message || "Already enrolled in this course"
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-[1400px]">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column - Course Info */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50 h-full">
              <div className="space-y-6 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                    <span className="block text-sm text-blue-600 font-medium mb-2">
                      <i className="fas fa-clock mr-2"></i>Duration
                    </span>
                    <span className="text-xl font-semibold text-gray-900">
                      {Duration}
                    </span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition-shadow">
                    <span className="block text-sm text-green-600 font-medium mb-2">
                      <i className="fas fa-indian-rupee-sign mr-2"></i>Cost
                    </span>
                    <span className="text-xl font-semibold text-gray-900">
                      ₹{Cost}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={`https://ui-avatars.com/api/?name=${Instructor}&background=random`}
                        alt={Instructor}
                        className="w-16 h-16 rounded-full ring-4 ring-blue-100"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <div className="bg-white rounded-full p-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm text-gray-500 mb-1">Instructor</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {Instructor}
                      </p>
                      <p className="text-sm text-blue-600">Expert Mentor</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl 
                  font-semibold hover:from-blue-700 hover:to-indigo-700 transform transition duration-200 
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  shadow-lg hover:shadow-xl"
                >
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="relative bg-gray-900 min-h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
              <iframe
                src={Link}
                title="Course Content"
                className="absolute inset-0 w-full h-full z-20"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Course Details Sections */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Prerequisites */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="bg-blue-100 p-3 rounded-xl mr-4">
                <i className="fas fa-list-check text-blue-600"></i>
              </span>
              Prerequisites
            </h2>
            <ul className="space-y-4">
              {Prerequisites?.split(",").map((prerequisite, index) => (
                <li
                  key={index}
                  className="flex items-center transform hover:translate-x-2 transition-transform duration-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg mr-4">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {prerequisite
                      .trim()
                      .split(" ")
                      .map((word) => word[0]?.toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Structure */}
          <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 lg:col-span-2 border border-gray-100 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="bg-purple-100 p-3 rounded-xl mr-4">
                <i className="fas fa-book-open text-purple-600"></i>
              </span>
              Course Structure
            </h2>
            <div className="prose max-w-none text-gray-700">
              {CourseStructure.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 leading-relaxed hover:text-gray-900 transition-colors duration-200"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseDescription.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  CourseStructure: PropTypes.string.isRequired,
  Duration: PropTypes.string.isRequired,
  Cost: PropTypes.number.isRequired,
  Instructor: PropTypes.string.isRequired,
  Prerequisites: PropTypes.string.isRequired,
  Link: PropTypes.string.isRequired,
};

export default CourseDescription;
