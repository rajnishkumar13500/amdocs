import Card from "../cards/card";
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
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        {courses.map((course, index) => (
          <Card key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
