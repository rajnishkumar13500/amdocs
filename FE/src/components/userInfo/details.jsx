import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { apiList } from "../../api/apilist";
import { apiClient } from "../../api/api";

const InfoIcon = ({ tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block ml-2">
      <span 
        className="inline-flex items-center text-blue-500 hover:text-blue-600 cursor-help transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          className="w-4 h-4"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" 
            clipRule="evenodd" 
          />
        </svg>
      </span>
      {showTooltip && (
        <div className="absolute left-6 top-0 z-[9999] w-64 p-4 
          bg-white/80 backdrop-blur-lg rounded-xl shadow-xl 
          border border-white/20 
          transform transition-all duration-200 
          text-gray-700"
        >
          <div className="relative">
            {/* Arrow */}
            <div className="absolute -left-2 top-2 w-2 h-2 
              bg-white/80 backdrop-blur-lg 
              border-l border-t border-white/20 
              transform rotate-45"
            ></div>
            {/* Content */}
            <div className="relative z-10 text-sm">
              {tooltip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Details = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    education_level: "",
    career_goal: "",
    preferred_learning_style: "",
    time_availability_hours_per_week: "",
    learning_pace: "",
    weekly_study_hours: "",
    platform_visits_per_week: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const token = localStorage.getItem("token");
        const response = await apiClient.get(apiList.userInfo);
        const userData = response.data.profile;
        
        // Map backend data to form fields
        setFormData({
          age: userData.age?.toString() || "",
          education_level: userData.education || "",
          career_goal: userData.goals || "",
          preferred_learning_style: userData.learningStyle || "",
          time_availability_hours_per_week: userData.timeAvailable?.toString() || "",
          learning_pace: userData.learningPace?.toString() || "",
          weekly_study_hours: userData.WeeklyHours?.toString() || "",
          platform_visits_per_week: userData.platformVisited?.toString() || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.age || formData.age < 16 || formData.age > 60) {
      newErrors.age = "Age must be between 16 and 60";
    }
    if (!formData.education_level) {
      newErrors.education_level = "Education level is required";
    }
    if (!formData.career_goal) {
      newErrors.career_goal = "Career goal is required";
    }
    if (!formData.preferred_learning_style) {
      newErrors.preferred_learning_style = "Preferred learning style is required";
    }
    if (
      !formData.time_availability_hours_per_week ||
      formData.time_availability_hours_per_week < 1 ||
      formData.time_availability_hours_per_week > 15
    ) {
      newErrors.time_availability_hours_per_week =
        "Time availability must be between 1 and 15 hours";
    }
    if (!formData.learning_pace || formData.learning_pace < 0 || formData.learning_pace > 2) {
      newErrors.learning_pace = "Learning pace must be between 0 and 2";
    }
    if (
      !formData.weekly_study_hours ||
      formData.weekly_study_hours < 1 ||
      formData.weekly_study_hours > 15
    ) {
      newErrors.weekly_study_hours =
        "Weekly study hours must be between 1 and 15";
    }
    if (
      !formData.platform_visits_per_week ||
      formData.platform_visits_per_week < 1 ||
      formData.platform_visits_per_week > 10
    ) {
      newErrors.platform_visits_per_week =
        "Platform visits must be between 1 and 10";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // const token = localStorage.getItem("token");
        // Map form data to match backend schema
        const mappedData = {
          age: parseInt(formData.age),
          education: formData.education_level,
          goals: formData.career_goal,
          learningStyle: formData.preferred_learning_style,
          timeAvailable: parseInt(formData.time_availability_hours_per_week),
          learningPace: parseFloat(formData.learning_pace),
          WeeklyHours: parseInt(formData.weekly_study_hours),
          platformVisited: parseInt(formData.platform_visits_per_week),
        };

        console.log('Sending update data:', mappedData);

        const response = await apiClient.put(apiList.userUpdateProfile, mappedData);

        console.log('Update response:', response.data);
        
        // Navigate to skills update after successful profile update
        navigate('/update-skills');
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl backdrop-blur-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Update Profile
          </h1>
          <p className="text-gray-600 mt-2">Step 1 of 2: Update your career information</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                Age
                <InfoIcon tooltip={
                  <div>
                    <p className="font-semibold mb-1">Valid Age Range:</p>
                    <ul className="list-disc list-inside">
                      <li>Minimum: 16 years</li>
                      <li>Maximum: 60 years</li>
                    </ul>
                  </div>
                } />
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="16"
                max="60"
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.age && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.age}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="education_level"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Education Level
              </label>
              <select
                id="education_level"
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.education_level && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.education_level}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="career_goal"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Career Goal
              </label>
              <select
                id="career_goal"
                name="career_goal"
                value={formData.career_goal}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select career goal</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
              {errors.career_goal && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.career_goal}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="preferred_learning_style"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Preferred Learning Style
              </label>
              <select
                id="preferred_learning_style"
                name="preferred_learning_style"
                value={formData.preferred_learning_style}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select learning style</option>
                <option value="Visual">Visual</option>
                <option value="Auditory">Auditory</option>
                <option value="Reading">Reading</option>
                <option value="Kinesthetic">Kinesthetic</option>
              </select>
              {errors.preferred_learning_style && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.preferred_learning_style}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="time_availability_hours_per_week"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                Time Availability (hours per week)
                <InfoIcon tooltip={
                  <div>
                    <p className="font-semibold mb-1">Time Availability:</p>
                    <ul className="list-disc list-inside">
                      <li>Minimum: 1 hour/week</li>
                      <li>Maximum: 15 hours/week</li>
                      <li>Please be realistic with your time commitment</li>
                    </ul>
                  </div>
                } />
              </label>
              <input
                type="number"
                id="time_availability_hours_per_week"
                name="time_availability_hours_per_week"
                value={formData.time_availability_hours_per_week}
                onChange={handleChange}
                min="1"
                max="15"
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.time_availability_hours_per_week && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.time_availability_hours_per_week}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="learning_pace"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                Learning Pace (0 - 2)
                <InfoIcon tooltip={
                  <div>
                    <p className="font-semibold mb-1">Learning Pace Scale:</p>
                    <ul className="list-disc list-inside">
                      <li>0: Slow paced learning</li>
                      <li>1: Moderate pace</li>
                      <li>2: Fast paced learning</li>
                    </ul>
                  </div>
                } />
              </label>
              <input
                type="number"
                id="learning_pace"
                name="learning_pace"
                value={formData.learning_pace}
                onChange={handleChange}
                min="0"
                max="2"
                step="1"
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.learning_pace && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.learning_pace}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="weekly_study_hours"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                Weekly Study Hours
                <InfoIcon tooltip={
                  <div>
                    <p className="font-semibold mb-1">Study Hours:</p>
                    <ul className="list-disc list-inside">
                      <li>Minimum: 1 hour/week</li>
                      <li>Maximum: 15 hours/week</li>
                      <li>Choose based on your schedule</li>
                    </ul>
                  </div>
                } />
              </label>
              <input
                type="number"
                id="weekly_study_hours"
                name="weekly_study_hours"
                value={formData.weekly_study_hours}
                onChange={handleChange}
                min="1"
                max="15"
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.weekly_study_hours && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.weekly_study_hours}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="platform_visits_per_week"
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
              >
                Platform Visits per Week
                <InfoIcon tooltip={
                  <div>
                    <p className="font-semibold mb-1">Platform Visits:</p>
                    <ul className="list-disc list-inside">
                      <li>Minimum: 1 visit/week</li>
                      <li>Maximum: 10 visits/week</li>
                      <li>Regular visits help maintain progress</li>
                    </ul>
                  </div>
                } />
              </label>
              <input
                type="number"
                id="platform_visits_per_week"
                name="platform_visits_per_week"
                value={formData.platform_visits_per_week}
                onChange={handleChange}
                min="1"
                max="10"
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.platform_visits_per_week && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.platform_visits_per_week}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl text-white font-semibold
                bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <span>Next: Update Skills</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="w-full py-3 px-6 rounded-xl text-gray-700 font-semibold
                border border-gray-300 hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
