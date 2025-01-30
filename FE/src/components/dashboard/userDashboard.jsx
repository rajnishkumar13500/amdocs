// import React from 'react';
import { useState, useEffect } from "react";
// import axios from "axios";
import { apiList } from "../../api/apilist";
import { apiClient } from "../../api/api";
import { getUserInfo } from "../auth/auth.service";
import { Link } from "react-router-dom";
import { FiClock, FiBook, FiAward } from "react-icons/fi";
// import Card from "../cards/card";
import RecommendedCard from "../cards/recommendedCard";

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainResponse = await apiClient.post(apiList.modelTrain);
        const [enrolledRes, recommendedRes] = await Promise.all([
          apiClient.get(apiList.userInfo),
          apiClient.post(apiList.modelPredict),
        ]);
        const response = await apiClient.get(apiList.allCourses);
        // console.log(response);
        setCourses(response.data);
        setEnrolledCourses(enrolledRes.data.profile.enrolledCourses);
        setRecommendedCourses(recommendedRes.data.data.recommended_courses);
        console.log(recommendedRes.data.data.recommended_courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // console.log(enrolledCourses);

  const CourseCard = ({ course, type }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={course.image}
          alt={course.image}
          className="w-full h-full object-cover"
        />
        {type === "enrolled" && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            {course.progress}% Complete
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {course.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{course.Duration}</span>
          </div>
          <div className="flex items-center">
            <FiBook className="mr-1" />
            <span>{course.Instructor}</span>
          </div>
        </div>
        <Link
          to={`/course/${course.id}`}
          className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          {type === "enrolled" ? "Continue Learning" : "View Course"}
        </Link>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {userInfo?.name}!
        </h1>
        <p className="opacity-90">Continue your learning journey</p>
      </div>

      {/* Recommended Courses Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="flex items-center">
              <FiAward className="mr-2" />
              Recommended for You
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((recommendedCourse) => {
            const course = courses.find((c) => c.name === recommendedCourse);
            return course && <RecommendedCard key={course.id} {...course} />;
          })}
        </div>
      </section>

      {/* Enrolled Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="flex items-center">
              <FiBook className="mr-2" />
              My Enrolled Courses
            </span>
          </h2>
          <Link
            to="/courses"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        {enrolledCourses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course.course}
                type="enrolled"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">
              You haven't enrolled in any courses yet.
            </p>
            <Link
              to="/courses"
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              Browse Courses →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
