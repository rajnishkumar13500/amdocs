import { Link } from "react-router-dom";
import { FiBook } from "react-icons/fi";
import { EnrolledCourseCard } from "../../cards/enrolledCard";
import PropTypes from "prop-types";
const EnrolledCourseSection = ({ enrolledCourses }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="flex items-center">
            <FiBook className="mr-2" />
            My Enrolled Courses
          </span>
        </h2>

        {/* View All */}
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
            You haven&apos;t enrolled in any courses yet.
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
  );
};

EnrolledCourseSection.propTypes = {
  enrolledCourses: PropTypes.array.isRequired,
};

export default EnrolledCourseSection;
