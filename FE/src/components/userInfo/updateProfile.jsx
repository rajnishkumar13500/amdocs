import { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    goals: "",
    learningStyle: "",
    timeAvailable: 0,
    learningPace: 0,
    WeeklyHours: 0,
    platformVisited: 0,
    python: 0,
    Statistics: 0,
    MachineLearning: 0,
    HTML_CSS: 0,
    JavaScript: 0,
    React: 0,
    SocialMedia: 0,
    SEO: 0,
    Analytics: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Skill categories for better organization
  const skillCategories = {
    Programming: ["python", "JavaScript", "React", "HTML_CSS"],
    DataScience: ["Statistics", "MachineLearning", "Analytics"],
    Marketing: ["SocialMedia", "SEO"]
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(response.data);
    } catch (err) {
      setError("Failed to fetch profile data");
      setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.match(/Hours|Available|Visited|pace/i) || Object.keys(skillCategories).flat().includes(name)
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 5000); // Clear success message after 5 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = "text", options, ...props }) => (
    <div className="transition-all duration-300 hover:transform hover:scale-[1.01]">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label || name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   bg-gray-50 transition-all duration-300"
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   bg-gray-50 transition-all duration-300"
          {...props}
        />
      )}
    </div>
  );

  const SkillSection = ({ category, skills }) => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map(skill => (
          <div key={skill} className="relative">
            <InputField
              label={skill.replace('_', '/')}
              name={skill}
              type="range"
              min="0"
              max="100"
              className="range-slider"
            />
            <span className="absolute right-0 top-0 text-sm text-gray-600">
              {formData[skill]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Update Your Profile
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Keep your profile updated to get better course recommendations
        </p>

        {(error || success) && (
          <div className={`mt-4 p-4 rounded-md ${
            error ? 'bg-red-50 border-l-4 border-red-400 text-red-700' : 
            'bg-green-50 border-l-4 border-green-400 text-green-700'
          }`}>
            <p className="text-sm">{error || success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Basic Information */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              <InputField name="name" required />
              <InputField
                label="Education Level"
                name="education"
                type="select"
                options={[
                  { value: "High School", label: "High School" },
                  { value: "Bachelor's", label: "Bachelor's Degree" },
                  { value: "Master's", label: "Master's Degree" },
                  { value: "PhD", label: "PhD" }
                ]}
              />
              <InputField
                name="goals"
                type="textarea"
                rows="3"
                placeholder="What are your learning goals?"
              />
            </div>
          </section>

          {/* Learning Preferences */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Learning Preferences</h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Learning Style"
                  name="learningStyle"
                  type="select"
                  options={[
                    { value: "Visual", label: "Visual" },
                    { value: "Auditory", label: "Auditory" },
                    { value: "Reading/Writing", label: "Reading/Writing" },
                    { value: "Kinesthetic", label: "Kinesthetic" }
                  ]}
                />
                <InputField
                  label="Time Available (hours/week)"
                  name="timeAvailable"
                  type="number"
                  min="0"
                  max="168"
                />
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Skill Levels</h2>
            <div className="space-y-4">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <SkillSection key={category} category={category} skills={skills} />
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white 
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-colors duration-200`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Updating Profile...
              </div>
            ) : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
