import { FiAward } from "react-icons/fi";
import Loader from "../../../utils/loader";
import { getUserInfo } from "../../auth/auth.service";
import PropTypes from "prop-types";

const WelcomeSections = ({
  profileUpdated,
  recommendedCourses,
  recommendLoading,
}) => {
  const userInfo = getUserInfo();
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back,{" "}
        {userInfo?.name
          .split(" ")
          .map(
            (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
          )
          .join(" ")}
        !
      </h1>
      <p className="opacity-90">Continue your learning journey</p>

      {/* Added Success Rate Card */}
      <div
        className="mt-4 bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-400/30 shadow-lg
            hover:bg-red-500/30 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiAward className="text-red-400 w-5 h-5 animate-bounce" />
            <span className="text-white font-medium">
              Predicted Goal Completion Rate
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="text-3xl font-bold bg-gradient-to-r from-red-300 to-red-100 
                text-transparent bg-clip-text tracking-wider"
            >
              {profileUpdated ? (
                recommendLoading ? (
                  <Loader />
                ) : (
                  `${recommendedCourses?.predicted_success_rate?.toFixed(2)}%`
                )
              ) : (
                ""
              )}
            </div>

            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-red-300 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-red-200 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WelcomeSections.propTypes = {
  profileUpdated: PropTypes.bool.isRequired,
  recommendedCourses: PropTypes.object.isRequired,
  recommendLoading: PropTypes.bool.isRequired,
};

export default WelcomeSections;
