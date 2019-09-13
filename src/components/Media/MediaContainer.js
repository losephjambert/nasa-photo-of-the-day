import React from "react";
import Video from "./Video";
import Photo from "./Photo";
import styled from "styled-components";

const StyledMediaContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  object-fit: cover;
  img,
  video {
    max-width: 100%;
    width: 90%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const MediaContainer = ({ media, isLoading }) => {
  // if (isLoading) return <p>LOADING MEDIA</p>;
  const Media =
    media.media_type === "video" ? (
      <Video src={media.url} />
    ) : (
      <Photo src={media.url} />
    );

  return (
    <StyledMediaContainer>
      {isLoading ? <p>LOADING MEDIA</p> : Media}
    </StyledMediaContainer>
  );
};

export default MediaContainer;
