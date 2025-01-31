import { useParams } from "react-router-dom";
import CourseDescription from "../components/course/discriptionCard";
// import BillingCard from "../components/course/BillingCard";
import { apiClient } from "../api/api";
import { apiList } from "../api/apilist";
import { useEffect, useState } from "react";

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const { courseId } = useParams();
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await apiClient.get(apiList.allCourses);
      // console.log(response);
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {courses?.map((course) => {
        if (course.id == courseId) {
          return (
            <CourseDescription
              key={course.id}
              {...course}
              courseId={courseId}
            />
          );
        }
        return null; // Add explicit return for when condition is false
      })}
    </div>
  );
};

export default CourseDetails;
