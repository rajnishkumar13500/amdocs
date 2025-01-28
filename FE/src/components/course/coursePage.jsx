import Card from "../card";
import { apiClient } from "../../api/api";
import { apiList } from "../../api/apilist";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await apiClient.get(apiList.allCourses);
      console.log(response);
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <Card key={index} {...course} />
      ))}
    </div>
  );
};

export default Courses;
