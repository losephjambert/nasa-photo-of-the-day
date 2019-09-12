import React from "react";

// example call with for video https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2014-03-12
// example call with for photo https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
// make api call
// set state with response
// conditionally render Photo or Video depending on media_type

const MediaContainer = ({ media }) => {
  if (media.media_type === "video")
    return <iframe src={media.url} frameborder="0" title="video" />;
  else return <img style={{ width: "30vw" }} src={media.url} alt="img" />;
};

export default MediaContainer;
