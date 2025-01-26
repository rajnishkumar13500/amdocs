import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ img, topic, description, link }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105">
      <img 
        className="w-full h-48 object-cover" 
        src={img} 
        alt={topic}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{topic}</h2>
        <p className="text-gray-600 text-base">
          {description.length > 150 ? `${description.substring(0, 150)}...` : description}
        </p>
      </div>
      <div className="px-6 py-4">
        <Link
          to={link}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
