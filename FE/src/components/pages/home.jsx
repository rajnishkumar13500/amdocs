// import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" min-h-screen">
      {/* Hero Section - Updated with animation and gradient */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-800 text-white py-32 rounded-3xl mx-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 transform transition duration-500 hover:scale-105">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                Unlock Your Learning Potential
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Join our innovative learning platform and transform your future.
                Master new skills with interactive courses designed for modern
                learners.
              </p>
              <Link
                to="/courses"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition duration-300 shadow-lg"
              >
                Start Learning Now →
              </Link>
            </div>
            <div className="md:w-1/2 transform transition duration-500 hover:scale-105">
              <img
                src="https://www.gumlet.com/learn/content/images/2022/07/Elearning_platform.jpg"
                alt="Learning Platform"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with hover effects */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Students Love Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature cards - Updated styling */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Expert Instructors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of experience in
                their respective fields. Get real-world insights and practical
                knowledge.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Self-Paced Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Study at your own pace with flexible schedules. Access course
                materials anytime, anywhere, and learn at your convenience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get help whenever you need it. Our dedicated support team and
                community are here to ensure your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Updated with modern design */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 animate-fade-in">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join over 100,000+ students who are already transforming their
            careers with our cutting-edge learning platform.
          </p>
          <div className="space-x-6">
            <Link
              to="/register"
              className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition duration-300 transform hover:scale-105 inline-block shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/courses"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition duration-300 transform hover:scale-105 inline-block"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
