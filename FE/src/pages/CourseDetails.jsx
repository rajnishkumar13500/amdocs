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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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
          })}
        </div>

        {/* <div className="lg:col-span-1 sticky top-4">
          <BillingCard courseCost={courseData.cost} />
        </div> */}
      </div>
    </div>
  );
};

export default CourseDetails;
