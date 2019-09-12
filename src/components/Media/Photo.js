// render an img
import React from 'react';

const Photo = ({ src }) => {
  return <img style={{ width: '600px' }} src={src} alt='img' />;
};

export default Photo;
