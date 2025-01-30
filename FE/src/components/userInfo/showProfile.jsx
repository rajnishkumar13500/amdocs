import { useState, useEffect } from "react";
// import axios from "axios";
import { apiList } from "../../api/apilist";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/api";

const ShowProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const token = localStorage.getItem("token");
        // console.log("Fetching profile with token:", token);
        const response = await apiClient.get(apiList.userInfo);
        console.log("Profile response:", response.data);
        setProfile(response.data.profile);
        setLoading(false);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleStartUpdate = () => {
    navigate('/update-profile');
  };

  // const handleUpdateSkills = () => {
  //   navigate('/update-skills');
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading profile: {error}
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center p-4">No profile data found</div>;
  }

  const skillsData = {
    Python: profile.python,
    Statistics: profile.Statistics,
    "Machine Learning": profile.MachineLearning,
    "HTML/CSS": profile.HTML_CSS,
    JavaScript: profile.JavaScript,
    React: profile.React,
    "Social Media": profile.SocialMedia,
    SEO: profile.SEO,
    Analytics: profile.Analytics,
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        {/* Profile Header with Photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
          <p className="text-gray-600 mt-2">{profile.email}</p>
          
          {/* Update Button */}
          <button
            onClick={handleStartUpdate}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-all duration-200 flex items-center gap-2 hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Update Profile
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-600">
                Age: <span className="text-gray-800">{profile.age ? `${profile.age} years` : 'Not specified'}</span>
              </p>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Learning Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="text-gray-600">Education: <span className="text-gray-800">{profile.education}</span></p>
              <p className="text-gray-600">Goals: <span className="text-gray-800">{profile.goals}</span></p>
              <p className="text-gray-600">Learning Style: <span className="text-gray-800">{profile.learningStyle}</span></p>
              <p className="text-gray-600">Time Available: <span className="text-gray-800">{profile.timeAvailable} hours</span></p>
              <p className="text-gray-600">Weekly Hours: <span className="text-gray-800">{profile.WeeklyHours} hours</span></p>
              <p className="text-gray-600">Learning Pace: <span className="text-gray-800">Level {profile.learningPace}</span></p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(skillsData).map(([skill, level]) => (
                level > 0 && (
                  <p key={skill} className="text-gray-600">
                    {skill}: <span className="text-gray-800">{level}%</span>
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
