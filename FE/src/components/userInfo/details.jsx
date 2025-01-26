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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Career Information Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="education_level"
            className="block text-sm font-medium text-gray-700"
          >
            Education Level
          </label>
          <select
            id="education_level"
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select education level</option>
            <option value="secondary">Secondary</option>
            <option value="bachelors">Bachelor&apos;s</option>
            <option value="masters">Master&apos;s</option>
          </select>
          {errors.education_level && (
            <p className="mt-1 text-sm text-red-600">
              {errors.education_level}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="career_goal"
            className="block text-sm font-medium text-gray-700"
          >
            Career Goal
          </label>
          <select
            id="career_goal"
            name="career_goal"
            value={formData.career_goal}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select career goal</option>
            <option value="web">Web Development</option>
            <option value="data science">Data Science</option>
            <option value="ai/ml">AI/ML</option>
          </select>
          {errors.career_goal && (
            <p className="mt-1 text-sm text-red-600">{errors.career_goal}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="preferred_learning_style"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Learning Style
          </label>
          <select
            id="preferred_learning_style"
            name="preferred_learning_style"
            value={formData.preferred_learning_style}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select learning style</option>
            <option value="visual">Visual</option>
            <option value="theory">Theory</option>
          </select>
          {errors.preferred_learning_style && (
            <p className="mt-1 text-sm text-red-600">
              {errors.preferred_learning_style}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="time_availability_hours_per_week"
            className="block text-sm font-medium text-gray-700"
          >
            Time Availability (hours per week)
          </label>
          <input
            type="number"
            id="time_availability_hours_per_week"
            name="time_availability_hours_per_week"
            value={formData.time_availability_hours_per_week}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.time_availability_hours_per_week && (
            <p className="mt-1 text-sm text-red-600">
              {errors.time_availability_hours_per_week}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="learning_pace"
            className="block text-sm font-medium text-gray-700"
          >
            Learning Pace
          </label>
          <select
            id="learning_pace"
            name="learning_pace"
            value={formData.learning_pace}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select learning pace</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="1.75">1.75x</option>
            <option value="2.0">2.0x</option>
          </select>
          {errors.learning_pace && (
            <p className="mt-1 text-sm text-red-600">{errors.learning_pace}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="weekly_study_hours"
            className="block text-sm font-medium text-gray-700"
          >
            Weekly Study Hours
          </label>
          <input
            type="number"
            id="weekly_study_hours"
            name="weekly_study_hours"
            value={formData.weekly_study_hours}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.weekly_study_hours && (
            <p className="mt-1 text-sm text-red-600">
              {errors.weekly_study_hours}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="platform_visits_per_week"
            className="block text-sm font-medium text-gray-700"
          >
            Platform Visits per Week
          </label>
          <input
            type="number"
            id="platform_visits_per_week"
            name="platform_visits_per_week"
            value={formData.platform_visits_per_week}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.platform_visits_per_week && (
            <p className="mt-1 text-sm text-red-600">
              {errors.platform_visits_per_week}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Details;
