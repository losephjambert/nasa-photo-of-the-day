import React from 'react';

const Video = ({ src }) => {
  return <iframe src={src} frameBorder='0' title='video' />;
};

export default Video;
