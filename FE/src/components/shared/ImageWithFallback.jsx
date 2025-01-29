import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageWithFallback = ({ src, alt, className, fallbackSrc = 'https://via.placeholder.com/400x300' }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallbackSrc: PropTypes.string,
};

export default ImageWithFallback; 