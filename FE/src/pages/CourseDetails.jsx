import { useParams } from 'react-router-dom';
import CourseDescription from '../components/course/discriptionCard';
import BillingCard from '../components/course/BillingCard';

const CourseDetails = () => {
  const { courseId } = useParams();

  // In a real application, you would fetch course data based on courseId
  const courseData = {
    courseImage: "https://example.com/course-image.jpg",
    courseTitle: "Advanced React Development",
    description: "A comprehensive course covering advanced React concepts including hooks, context, performance optimization, and more. This course is designed for developers who want to take their React skills to the next level.",
    structure: [
      {
        title: "Introduction to Advanced Concepts",
        description: "Learn about advanced React patterns and concepts..."
      },
      {
        title: "State Management",
        description: "Deep dive into Redux and other state management solutions..."
      },
      {
        title: "Performance Optimization",
        description: "Learn techniques to optimize React applications..."
      }
    ],
    duration: "12 weeks",
    cost: 29999,
    instructor: "John Doe",
    prerequisites: [
      "Basic knowledge of JavaScript",
      "Understanding of React basics",
      "Familiarity with ES6+"
    ],
    learningOutcomes: [
      "Build complex React applications",
      "Implement advanced state management",
      "Create custom hooks and components",
      "Optimize React applications for performance"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CourseDescription {...courseData} />
        </div>
        <div className="lg:col-span-1 sticky top-4">
          <BillingCard courseCost={courseData.cost} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 