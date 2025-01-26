import { useState } from "react";

const Details = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.age || formData.age < 16 || formData.age > 100) {
      newErrors.age = "Age must be between 16 and 100";
    }
    if (!formData.education_level) {
      newErrors.education_level = "Education level is required";
    }
    if (!formData.career_goal) {
      newErrors.career_goal = "Career goal is required";
    }
    if (!formData.preferred_learning_style) {
      newErrors.preferred_learning_style =
        "Preferred learning style is required";
    }
    if (
      !formData.time_availability_hours_per_week ||
      formData.time_availability_hours_per_week < 1 ||
      formData.time_availability_hours_per_week > 168
    ) {
      newErrors.time_availability_hours_per_week =
        "Time availability must be between 1 and 168 hours";
    }
    if (!formData.learning_pace) {
      newErrors.learning_pace = "Learning pace is required";
    }
    if (
      !formData.weekly_study_hours ||
      formData.weekly_study_hours < 1 ||
      formData.weekly_study_hours > 168
    ) {
      newErrors.weekly_study_hours =
        "Weekly study hours must be between 1 and 168";
    }
    if (
      !formData.platform_visits_per_week ||
      formData.platform_visits_per_week < 1 ||
      formData.platform_visits_per_week > 7
    ) {
      newErrors.platform_visits_per_week =
        "Platform visits must be between 1 and 7";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log(formData);
        alert("Form submitted successfully!");
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl backdrop-blur-lg border border-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Career Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
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
                <option value="secondary">Secondary</option>
                <option value="bachelors">Bachelor&apos;s</option>
                <option value="masters">Master&apos;s</option>
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
                <option value="web">Web Development</option>
                <option value="data science">Data Science</option>
                <option value="ai/ml">AI/ML</option>
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
                <option value="visual">Visual</option>
                <option value="theory">Theory</option>
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
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Time Availability (hours per week)
              </label>
              <input
                type="number"
                id="time_availability_hours_per_week"
                name="time_availability_hours_per_week"
                value={formData.time_availability_hours_per_week}
                onChange={handleChange}
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
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Learning Pace
              </label>
              <select
                id="learning_pace"
                name="learning_pace"
                value={formData.learning_pace}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select learning pace</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="1.75">1.75x</option>
                <option value="2.0">2.0x</option>
              </select>
              {errors.learning_pace && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.learning_pace}
                </p>
              )}
            </div>

            <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
              <label
                htmlFor="weekly_study_hours"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Weekly Study Hours
              </label>
              <input
                type="number"
                id="weekly_study_hours"
                name="weekly_study_hours"
                value={formData.weekly_study_hours}
                onChange={handleChange}
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
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Platform Visits per Week
              </label>
              <input
                type="number"
                id="platform_visits_per_week"
                name="platform_visits_per_week"
                value={formData.platform_visits_per_week}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.platform_visits_per_week && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.platform_visits_per_week}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-xl text-white font-semibold
              bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
              shadow-lg hover:shadow-xl"
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
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
