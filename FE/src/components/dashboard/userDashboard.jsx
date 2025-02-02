import { useState, useEffect } from "react";
import { apiList } from "../../api/apilist";
import { apiClient } from "../../api/api";
import RecommendedCard from "../cards/recommendedCard";
import WelcomeSections from "./components/welcomeSections";
import RecommendCourseSection from "./components/RecommendCourse";
import EnrolledCourseSection from "./components/EnrolledCourse";

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrolledRes = await apiClient.get(apiList.userInfo);
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
          // console.log(recommendedRes.data.data);
          setRecommendLoading(false);
          // console.log(recommendLoading);
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
      <WelcomeSections
        profileUpdated={profileUpdated}
        recommendedCourses={recommendedCourses}
        recommendLoading={recommendLoading}
      />

      {/* Recommended Courses Section */}
      <RecommendCourseSection
        profileUpdated={profileUpdated}
        recommendLoading={recommendLoading}
        recommendedCourseElements={recommendedCourseElements}
      />

      {/* Enrolled Courses Section */}
      <EnrolledCourseSection enrolledCourses={enrolledCourses} />
    </div>
  );
};

export default UserDashboard;
