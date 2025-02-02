import PropTypes from "prop-types";

const DetailSection = ({ Prerequisites, CourseStructure }) => {
  return (
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
  );
};

DetailSection.propTypes = {
  Prerequisites: PropTypes.string.isRequired,
  CourseStructure: PropTypes.string.isRequired,
};

export default DetailSection;
