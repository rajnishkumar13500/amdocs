import { FiClock, FiBook } from "react-icons/fi";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { apiClient } from "../../api/api";
import { apiList } from "../../api/apilist";

export const EnrolledCourseCard = ({ course,  userProgress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(userProgress || 0);

  const handleProgressChange = async(e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    try {
      const response = await apiClient.put(apiList.courseProgress, { 
        cId: course.id, 
        progress: newProgress 
      });
      console.log(response);
    } catch (error) {
      console.error('Error updating progress:', error);
      setProgress(progress); // Revert on error
    }
  };

  // New function to determine color based on progress
  const getProgressColor = (progressValue) => {
    if (progressValue <= 30) {
      // Red to Yellow gradient
      return `rgb(239, ${(progressValue * 8.5)}, 68)`;
    } else if (progressValue <= 70) {
      // Yellow to Green gradient
      return `rgb(${239 - ((progressValue - 30) * 4.8)}, ${255 - ((progressValue - 30) * 2)}, 68)`;
    } else {
      // Green
      return '#22c55e';
    }
  };

  // New function to get the background gradient for the slider
  const getSliderBackground = (progressValue) => {
    const color = getProgressColor(progressValue);
    return `linear-gradient(to right, ${color} ${progressValue}%, #e5e7eb ${progressValue}%)`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={course.image}
          alt={course.image}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white"
          style={{ backgroundColor: getProgressColor(progress) }}
        >
          {progress}% Complete
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {course.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{course.Duration}</span>
          </div>
          <div className="flex items-center">
            <FiBook className="mr-1" />
            <span>{course.Instructor}</span>
          </div>
        </div>
        <div 
          className="mt-4 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <div className="w-full px-4 py-3 bg-gray-100 rounded-lg">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer 
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md 
                  [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 
                  [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white 
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md 
                  [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 
                  [&::-moz-range-thumb]:border-gray-300 [&::-moz-range-thumb]:hover:scale-110
                  [&::-webkit-slider-runnable-track]:rounded-lg
                  [&::-moz-range-track]:rounded-lg
                  hover:shadow-lg"
                style={{
                  background: getSliderBackground(progress)
                }}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">0%</span>
                <span 
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: getProgressColor(progress) }}
                >
                  {progress}% Complete
                </span>
                <span className="text-xs text-gray-500">100%</span>
              </div>
            </div>
          ) : (
            <button 
              className="inline-flex items-center justify-center w-full px-4 py-2 
                rounded-lg text-white transition-colors duration-300 hover:shadow-lg
                bg-blue-600 hover:bg-blue-700"
            >
              Edit Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
EnrolledCourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    progress: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    Duration: PropTypes.string.isRequired,
    Instructor: PropTypes.string.isRequired,
  }).isRequired,
  userProgress: PropTypes.number.isRequired,
};