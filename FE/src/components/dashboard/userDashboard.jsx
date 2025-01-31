// import React from 'react';
import { useState, useEffect } from "react";
// import axios from "axios";
import { apiList } from "../../api/apilist";
import { apiClient } from "../../api/api";
import { getUserInfo } from "../auth/auth.service";
import { Link } from "react-router-dom";
import { FiBook, FiAward } from "react-icons/fi";
// import Card from "../cards/card";
import RecommendedCard from "../cards/recommendedCard";
import { EnrolledCourseCard } from "../cards/enrolledCard";
import Loader from "./loader";

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const userInfo = getUserInfo();
  // console.log(userInfo);
  const [recommendLoading, setRecommendLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userProfile = await apiClient.get(apiList.userGetProfile);
        // console.log(userProfile.data.profile.isupdated);
        // console.log(userProfile.data);
        // const trainResponse = await apiClient.post(apiList.modelTrain);
        const enrolledRes = await apiClient.get(apiList.userInfo);
        // Promise.all([
        //   apiClient.get(apiList.userInfo),

        //   apiClient.post(apiList.modelPredict),
        // ]);

        const response = await apiClient.get(apiList.allCourses);
        // console.log(response);
        // console.log(enrolledRes);
        setProfileUpdated(enrolledRes.data.profile.isupdated);
        // console.log(enrolledRes.data.profile.isupdated);
        // console.log(profileUpdated);
        setCourses(response.data);
        setEnrolledCourses(enrolledRes.data.profile.enrolledCourses);
        // setRecommendLoading();
        if (profileUpdated) {
          await apiClient.post(apiList.modelTrain);
          const recommendedRes = await apiClient.post(apiList.modelPredict);
          setRecommendedCourses(recommendedRes.data.data);
          console.log(recommendedRes.data.data);
          setRecommendLoading(false);
          console.log(recommendLoading);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profileUpdated, recommendLoading]);

  const recommendedCourseElements = [];
  for (let i = 0; i < recommendedCourses?.recommended_courses?.length; i++) {
    const recommendedCourse = recommendedCourses.recommended_courses[i];
    const course = courses.find((c) => c.name === recommendedCourse);
    if (course) {
      recommendedCourseElements.push(
        <RecommendedCard
          key={Math.random()}
          {...course}
          difficulty={recommendedCourses?.skill_gaps[i]?.difficulty}
        />
      );
    }
  }

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

        {/* Added Success Rate Card */}
        <div
          className="mt-4 bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-400/30 shadow-lg
            hover:bg-red-500/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiAward className="text-red-400 w-5 h-5 animate-bounce" />
              <span className="text-white font-medium">
                Predicted Goal Completion Rate
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="text-3xl font-bold bg-gradient-to-r from-red-300 to-red-100 
                text-transparent bg-clip-text tracking-wider"
              >
                {profileUpdated ? (
                  recommendLoading ? (
                    <Loader />
                  ) : (
                    `${recommendedCourses?.predicted_success_rate?.toFixed(2)}%`
                  )
                ) : (
                  ""
                  // <h1>Please update your profile to get recommended courses</h1>
                )}
              </div>

              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-red-300 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-red-200 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </div>
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
        {profileUpdated ? (
          recommendLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourseElements}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1>Please update your profile to get recommended courses</h1>
            <Link
              to="/profile"
              className="text-blue-600 m-5 hover:text-blue-700 font-medium"
            >
              Update Profile →
            </Link>
          </div>
        )}

        {/* {recommendedCourses.recommended_courses.map((recommendedCourse) => {
            const course = courses.find((c) => c.name === recommendedCourse);
            return course && <RecommendedCard key={course.id} {...course} />;

          })} */}
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
              <EnrolledCourseCard
                key={course.id}
                course={course.course}
                userProgress={course.progress}
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
