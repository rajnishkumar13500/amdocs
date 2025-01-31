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
  // console.log(Link);

  const handleEnroll = async () => {
    if (!userInfo) {
      // toast.error("Please login to enroll in the course");
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Course Header */}
      <div>
        <iframe
          src={Link}
          title="Course Content"
          className="w-full h-96 border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <img
          src={image}
          alt={name}
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Duration:</span>

              <span className="ml-2 text-gray-700">{Duration}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Instructor:</span>

              <span className="ml-2 text-gray-700">{Instructor}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Cost:</span>

              <span className="ml-2 text-green-600 font-bold">₹{Cost}</span>
            </div>
          </div>
          <button
            onClick={handleEnroll}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* Course Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Course Description
        </h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Prerequisites */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside space-y-2">
          {Prerequisites?.split(",").map((prerequisite, index) => (
            <li key={index} className="text-gray-600">
              {prerequisite
                .trim()
                .split(" ")
                .map((word) => word[0]?.toUpperCase() + word.slice(1))
                .join(" ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Course Structure */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Course Structure
        </h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-600">{CourseStructure}</p>
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
