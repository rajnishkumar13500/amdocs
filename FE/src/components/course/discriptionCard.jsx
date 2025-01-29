import PropTypes from "prop-types";
import { apiClient } from "../../api/api";
import { apiList } from "../../api/apilist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUserInfo } from "../auth/auth.service";

const CourseDescription = ({
  courseImage,
  courseTitle,
  description,
  structure,
  duration,
  cost,
  instructor,
  prerequisites,
  learningOutcomes,
  courseId,
}) => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleEnroll = async () => {
    if (!userInfo) {
      // toast.error("Please login to enroll in the course");
      navigate("/login");
      return;
    }
    try {
      const response = await apiClient.post(apiList.courseEnroll(courseId));
      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully enrolled in the course!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error(
        error.response?.data?.message || "Failed to enroll in the course"
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Course Header */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <img
          src={courseImage}
          alt={courseTitle}
          className="w-full h-[300px] object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {courseTitle}
            </h1>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Duration:</span>
              <span className="ml-2 text-gray-700">{duration}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Instructor:</span>
              <span className="ml-2 text-gray-700">{instructor}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Cost:</span>
              <span className="ml-2 text-green-600 font-bold">₹{cost}</span>
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

      {/* Learning Outcomes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          What You&apos;ll Learn
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {learningOutcomes.map((outcome, index) => (
            <li key={index} className="text-gray-600">
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside space-y-2">
          {prerequisites.map((prerequisite, index) => (
            <li key={index} className="text-gray-600">
              {prerequisite}
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
          {structure.map((module, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Module {index + 1}: {module.title}
              </h3>
              <p className="text-gray-600">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CourseDescription.propTypes = {
  courseImage: PropTypes.string.isRequired,
  courseTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  structure: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  duration: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  instructor: PropTypes.string.isRequired,
  prerequisites: PropTypes.arrayOf(PropTypes.string).isRequired,
  learningOutcomes: PropTypes.arrayOf(PropTypes.string).isRequired,
  courseId: PropTypes.string.isRequired,
};

export default CourseDescription;
