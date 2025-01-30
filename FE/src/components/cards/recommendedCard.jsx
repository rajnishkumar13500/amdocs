import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";

const RecommendedCard = ({ image, name, description, id, difficulty }) => {
  const navigate = useNavigate();
  // console.log(difficulty);

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-600",
          border: "border-green-400",
        };
      case "intermediate":
        return {
          bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
          border: "border-yellow-400",
        };
      case "advanced":
        return {
          bg: "bg-gradient-to-r from-red-500 to-rose-600",
          border: "border-red-400",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
          border: "border-blue-400",
        };
    }
  };

  const difficultyStyle = getDifficultyColor(difficulty);

  return (
    <div
      className="group relative max-w-sm rounded-xl overflow-hidden shadow-lg bg-white 
      transition-all duration-300 hover:scale-[1.02] cursor-pointer
      hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-card-shine
      border border-blue-100"
      onClick={() => navigate(`/course/${id}`)}
    >
      {/* Recommended Label */}
      <div className="absolute top-4 left-0 z-10">
        <div
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500
          text-white pl-4 pr-5 py-1.5 rounded-r-full text-sm font-semibold
          shadow-lg border-l-4 border-red-600 backdrop-blur-sm
          bg-opacity-90"
        >
          <FiStar className="animate-spin-slow text-white h-4 w-4" />
          <span className="tracking-wide">RECOMMENDED</span>
        </div>
      </div>

      {/* Enhanced Difficulty Label */}
      <div className="absolute -right-16 top-7 rotate-45 z-20 w-[220px]">
        <div
          className={`${difficultyStyle.bg} py-1.5 text-center text-xs font-bold text-white
          shadow-lg border-t border-b ${difficultyStyle.border} backdrop-blur-sm
          transition-all duration-300 group-hover:scale-110`}
        >
          <span className="tracking-widest uppercase">
            {difficulty || "All Levels"}
          </span>
        </div>
      </div>

      {/* Glitter Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent 
        opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full 
        transition-all duration-1000"
      />

      <div className="relative">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 
          group-hover:scale-105"
          src={image}
          alt={name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
      </div>

      <div className="px-6 py-4 relative">
        <h2
          className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 
          transition-colors duration-300"
        >
          {name}
        </h2>

        <p className="text-gray-600 text-base">
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>
      </div>

      <div className="px-6 py-4">
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white 
          px-4 py-2.5 rounded-lg font-semibold transition-all duration-300
          hover:from-blue-600 hover:to-blue-700 hover:shadow-md
          active:scale-[0.98] shadow-sm border border-blue-400"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

RecommendedCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default RecommendedCard;
