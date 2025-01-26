import { useState } from "react";

const UserSkillInfo = () => {
  const [formData, setFormData] = useState({
    skill_python: "0",
    skill_statistics: "0",
    skill_machine_learning: "0",
    skill_html_css: "0",
    skill_javascript: "0",
    skill_react: "0",
    skill_social_media: "0",
    skill_seo: "0",
    skill_analytics: "0",
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
    if (
      !formData.skill_statistics ||
      formData.skill_statistics < 0 ||
      formData.skill_statistics > 100
    ) {
      newErrors.skill_statistics = "Skill_Statistics must be between 0 and 100";
    }
    if (
      !formData.skill_python ||
      formData.skill_python < 0 ||
      formData.skill_python > 100
    ) {
      newErrors.skill_python = "Skill_Python must be between 0 and 100";
    }
    if (
      !formData.skill_machine_learning ||
      formData.skill_machine_learning < 0 ||
      formData.skill_machine_learning > 100
    ) {
      newErrors.skill_machine_learning =
        "Skill_Machine_Learning must be between 0 and 100";
    }
    if (
      !formData.skill_html_css ||
      formData.skill_html_css < 0 ||
      formData.skill_html_css > 100
    ) {
      newErrors.skill_html_css = "Skill_HTML_CSS must be between 0 and 100";
    }
    if (
      !formData.skill_javascript ||
      formData.skill_javascript < 0 ||
      formData.skill_javascript > 100
    ) {
      newErrors.skill_javascript = "Skill_JavaScript must be between 0 and 100";
    }
    if (
      !formData.skill_react ||
      formData.skill_react < 0 ||
      formData.skill_react > 100
    ) {
      newErrors.skill_react = "Skill_React must be between 0 and 100";
    }
    if (
      !formData.skill_social_media ||
      formData.skill_social_media < 0 ||
      formData.skill_social_media > 100
    ) {
      newErrors.skill_social_media =
        "Skill_Social_Media must be between 0 and 100";
    }
    if (
      !formData.skill_seo ||
      formData.skill_seo < 0 ||
      formData.skill_seo > 100
    ) {
      newErrors.skill_seo = "Skill_SEO must be between 0 and 100";
    }
    if (
      !formData.skill_analytics ||
      formData.skill_analytics < 0 ||
      formData.skill_analytics > 100
    ) {
      newErrors.skill_analytics = "Skill_Analytics must be between 0 and 100";
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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg my-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Rate Your Skills
        <p className="text-sm text-gray-500 mt-2 font-normal">
          Move the sliders to indicate your proficiency level in each skill
        </p>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6">
          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_python"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Python
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_python}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_python"
                  name="skill_python"
                  value={formData.skill_python}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_python}%, #e5e7eb ${formData.skill_python}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_python && (
              <p className="mt-2 text-sm text-red-500">{errors.skill_python}</p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_statistics"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Statistics
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_statistics}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_statistics"
                  name="skill_statistics"
                  value={formData.skill_statistics}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_statistics}%, #e5e7eb ${formData.skill_statistics}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_statistics && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skill_statistics}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_machine_learning"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Machine Learning
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_machine_learning}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_machine_learning"
                  name="skill_machine_learning"
                  value={formData.skill_machine_learning}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_machine_learning}%, #e5e7eb ${formData.skill_machine_learning}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_machine_learning && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skill_machine_learning}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_html_css"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  HTML/CSS
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_html_css}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_html_css"
                  name="skill_html_css"
                  value={formData.skill_html_css}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_html_css}%, #e5e7eb ${formData.skill_html_css}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_html_css && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skill_html_css}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_javascript"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  JavaScript
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_javascript}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_javascript"
                  name="skill_javascript"
                  value={formData.skill_javascript}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_javascript}%, #e5e7eb ${formData.skill_javascript}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_javascript && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skill_javascript}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_react"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  React
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_react}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_react"
                  name="skill_react"
                  value={formData.skill_react}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_react}%, #e5e7eb ${formData.skill_react}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_react && (
              <p className="mt-2 text-sm text-red-500">{errors.skill_react}</p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_social_media"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Social Media
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_social_media}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_social_media"
                  name="skill_social_media"
                  value={formData.skill_social_media}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_social_media}%, #e5e7eb ${formData.skill_social_media}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_social_media && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skill_social_media}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_seo"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  SEO
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_seo}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_seo"
                  name="skill_seo"
                  value={formData.skill_seo}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_seo}%, #e5e7eb ${formData.skill_seo}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_seo && (
              <p className="mt-2 text-sm text-red-500">{errors.skill_seo}</p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-48">
                <label
                  htmlFor="skill_analytics"
                  className="text-sm font-semibold text-gray-700 block mb-1"
                >
                  Analytics
                </label>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.skill_analytics}%
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="skill_analytics"
                  name="skill_analytics"
                  value={formData.skill_analytics}
                  onChange={handleChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${formData.skill_analytics}%, #e5e7eb ${formData.skill_analytics}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
            {errors.skill_analytics && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skill_analytics}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Save Skills"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserSkillInfo;
