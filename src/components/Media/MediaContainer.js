import React from 'react';
import Video from './Video';
import Photo from './Photo';

const MediaContainer = ({ media, isLoading }) => {
  if (isLoading) return <p>LOADING MEDIA</p>;

  if (media.media_type === 'video') return <Video src={media.url} />;
  else return <Photo src={media.url} />;
};

export default MediaContainer;
