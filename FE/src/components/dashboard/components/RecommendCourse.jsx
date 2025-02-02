import { FiAward } from "react-icons/fi";
import Loader from "../../../utils/loader";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecommendCourseSection = ({
  profileUpdated,
  recommendLoading,
  recommendedCourseElements,
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="flex items-center">
            <FiAward className="mr-2" />
            Recommended for You
          </span>
        </h2>
      </div>
      {profileUpdated ? (
        recommendLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourseElements}
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-full">
          <h1>Please update your profile to get recommended courses</h1>
          <Link
            to="/profile"
            className="text-blue-600 m-5 hover:text-blue-700 font-medium"
          >
            Update Profile →
          </Link>
        </div>
      )}
    </section>
  );
};

RecommendCourseSection.propTypes = {
  profileUpdated: PropTypes.bool.isRequired,
  recommendLoading: PropTypes.bool.isRequired,
  recommendedCourseElements: PropTypes.array.isRequired,
};

export default RecommendCourseSection;
