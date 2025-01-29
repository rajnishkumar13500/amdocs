import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseDescription from "../components/course/discriptionCard";
import { apiClient } from "../api/api";
import { apiList } from "../api/apilist";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching course details for ID:', courseId); // Debug log
        const response = await apiClient.get(apiList.courseDetails(courseId));
        console.log('API Response:', response.data); // Debug log
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError(error.response?.data?.message || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Loading course details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Course not found</div>
      </div>
    );
  }

  // Transform the API data to match the CourseDescription props
  const transformedData = {
    courseImage: courseData.image,
    courseTitle: courseData.name,
    description: courseData.description,
    structure: courseData.CourseStructure ? [
      {
        title: "Course Structure",
        description: courseData.CourseStructure,
      }
    ] : [],
    duration: courseData.Duration,
    cost: courseData.Cost,
    instructor: courseData.Instructor,
    prerequisites: courseData.Prerequisites ? courseData.Prerequisites.split(',').map(item => item.trim()) : [],
    learningOutcomes: courseData.LearningRequirements ? courseData.LearningRequirements.split(',').map(item => item.trim()) : [],
    courseId: courseId
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseDescription {...transformedData} />
    </div>
  );
};

export default CourseDetails;
