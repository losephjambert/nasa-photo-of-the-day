import React from "react";
import Video from "./Video";
import Photo from "./Photo";
import styled from "styled-components";

const StyledMediaContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 600px;
  max-height: 600px;
  object-fit: cover;
  margin: auto;
  position: relative;
  z-index: 10;
  img,
  video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const MediaContainer = ({ media, isLoading }) => {
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
