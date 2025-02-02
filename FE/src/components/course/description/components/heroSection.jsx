import PropTypes from "prop-types";

const HeroSection = ({
  name,
  description,
  Duration,
  Cost,
  Instructor,
  Link,
  handleEnroll,
}) => {
  return (
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
  );
};

HeroSection.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Duration: PropTypes.string.isRequired,
  Cost: PropTypes.number.isRequired,
  Instructor: PropTypes.string.isRequired,
  Link: PropTypes.string.isRequired,
  handleEnroll: PropTypes.func.isRequired,
};

export default HeroSection;
