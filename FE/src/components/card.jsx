import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageWithFallback from './shared/ImageWithFallback';

const Card = ({ id, name, description, image, Duration, Instructor, Cost }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <ImageWithFallback
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">
          {description?.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className="text-sm text-gray-600">
          <p>Duration: {Duration}</p>
          <p>Instructor: {Instructor}</p>
          <p>Cost: ₹{Cost}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <Link
          to={`/course/${id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  Duration: PropTypes.string,
  Instructor: PropTypes.string,
  Cost: PropTypes.number,
};

export default Card;
