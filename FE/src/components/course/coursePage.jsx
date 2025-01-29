import Card from "../card";
import { apiClient } from "../../api/api";
import { apiList } from "../../api/apilist";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get(apiList.allCourses);
        console.log('Courses response:', response.data);
        const coursesData = Array.isArray(response.data) ? response.data : response.data.courses;
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl">No courses available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mx-auto max-w-7xl place-items-center">
      {courses.map((course) => (
        <Card 
          key={course.id} 
          id={course.id}
          name={course.name}
          description={course.description}
          image={course.image}
          Duration={course.Duration}
          Instructor={course.Instructor}
          Cost={course.Cost}
        />
      ))}
    </div>
  );
};

export default Courses;
