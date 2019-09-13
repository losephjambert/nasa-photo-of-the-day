import React, { useState, useEffect } from "react";
import MediaContainer from "./components/Media/MediaContainer";
import Details from "./components/Details";
import Button from "./components/Button";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  font-weight: 400;
  font-size: 1.6rem;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -75px;
  z-index: 0;
`;
const DetailsInnerContainer = styled.section`
  width: 90%;
  margin: auto;
  padding-top: 12.5vh;
  padding-bottom: 25px;
  position: relative;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-color: white;
  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: white;
    position: absolute;
    top: 0;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 45px 3vw;
  padding-bottom: 0;
`;

const _startdate = new moment();
const url = `https://api.nasa.gov/planetary/apod?api_key=QYV95kw1NSpdnVcv3dE3zn4UEOlfuhbT69Z2ox3s&date=`;
const stub = {
  copyright: "Markus Bauer",
  date: "2019-09-12",
  explanation:
    "These cosmic dust clouds drift some 1,300 light-years away along the fertile starfields of the constellation Cepheus. The beautiful Iris Nebula, also known as NGC 7023, blossoms at the upper left. Not the only nebula in the sky to evoke the imagery of flowers, its pretty, symmetric form spans about 6 light-years. This nebula's dominant blue color is characteristic of the pervasive dust grains reflecting light from a nearby hot, bluish star. But darker, obscuring dust clouds cover most of the nearly 4 degree wide field of view. At the right is the LDN 1147/1158 complex of Lynds Dark Nebulae. Stars are forming there, still hidden within the dark cloud cores. A search through the sharp image can identify Herbig-Haro objects though, jets of shocked glowing gas emanating from recently formed stars.",
  hdurl:
    "https://apod.nasa.gov/apod/image/1909/IRISNebulaSurroundingsNGC7023.jpg",
  media_type: "image",
  service_version: "v1",
  title: "The Iris Nebula in a Field of Dust",
  url:
    "https://apod.nasa.gov/apod/image/1909/IRISNebulaSurroundingsNGC7023_1100.jpg"
};
const format = `YYYY-MM-DD`;

function App() {
  const [startdate] = useState(_startdate);
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState(stub);
  const [currentDate, setCurrentDate] = useState(_startdate);

  useEffect(() => {
    axios
      .get(url + currentDate.format(`YYYY-MM-DD`))
      .then(response => {
        console.log(response.data);
        setMedia(response.data);
        setIsLoading(isLoading => !isLoading);
      })
      .catch(error => {
        console.log(`there was an error fetching ${url}`);
        console.error(error);
      });
  }, [currentDate]);

  const handleDateChange = day => {
    setIsLoading(isLoading => !isLoading);
    const newCurrentDate = currentDate.clone().subtract(day, "days");
    setCurrentDate(newCurrentDate);
  };

  return (
    <>
      <Title>NASA Astronomy Picture of the Day</Title>
      <MediaContainer media={media} isLoading={isLoading} />
      <DetailsContainer>
        <DetailsInnerContainer>
          <Details
            date={media.date}
            explanation={media.explanation}
            title={media.title}
          />
          <ButtonContainer>
            <Button
              onClick={handleDateChange}
              value={1}
              text={"< Previous Day's Image"}
              primary
            />
            <Button
              primary
              onClick={handleDateChange}
              value={-1}
              text={"Next Day's Image >"}
              disabled={currentDate.format(format) === startdate.format(format)}
            />
          </ButtonContainer>
        </DetailsInnerContainer>
      </DetailsContainer>
    </>
  );
}

export default App;
