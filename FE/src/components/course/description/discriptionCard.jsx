import PropTypes from "prop-types";
import { apiClient } from "../../../api/api";
import { apiList } from "../../../api/apilist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUserInfo } from "../../auth/auth.service";
import HeroSection from "./components/heroSection";
import DetailSection from "./components/detailSection";

const CourseDescription = ({
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
        <HeroSection
          name={name}
          description={description}
          Duration={Duration}
          Cost={Cost}
          Instructor={Instructor}
          Link={Link}
          handleEnroll={handleEnroll}
        />

        {/* Course Details Sections */}
        <DetailSection
          Prerequisites={Prerequisites}
          CourseStructure={CourseStructure}
        />
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
