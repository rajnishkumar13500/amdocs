import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About Our Learning Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Empowering learners through personalized course recommendations and adaptive learning paths
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We're dedicated to revolutionizing online education by providing personalized learning experiences. 
            Our platform uses advanced algorithms to understand your learning style, goals, and preferences to 
            recommend the most suitable courses for your journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            title="Personalized Learning"
            description="Get course recommendations tailored to your skills, goals, and learning style"
            icon="🎯"
          />
          <FeatureCard 
            title="Progress Tracking"
            description="Monitor your learning journey with detailed progress tracking and analytics"
            icon="📊"
          />
          <FeatureCard 
            title="Diverse Courses"
            description="Access a wide range of courses from programming to digital marketing"
            icon="📚"
          />
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-6">
            <Step 
              number="1"
              title="Create Your Profile"
              description="Tell us about your goals, experience, and learning preferences"
            />
            <Step 
              number="2"
              title="Get Recommendations"
              description="Receive personalized course suggestions based on your profile"
            />
            <Step 
              number="3"
              title="Start Learning"
              description="Enroll in courses and track your progress as you learn"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <a 
            href="mailto:contact@example.com" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {number}
    </div>
    <div className="ml-4">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  </div>
);

export default About;
