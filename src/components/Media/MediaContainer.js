import React from 'react';

const MediaContainer = ({ media, isLoading }) => {
  if (isLoading) return <p>LOADING MEDIA</p>;

  if (media.media_type === 'video') return <iframe src={media.url} frameBorder='0' title='video' />;
  else return <img style={{ width: '600px' }} src={media.url} alt='img' />;
};

export default MediaContainer;
