import React, { useState, useEffect } from 'react';
import MediaContainer from './components/Media/MediaContainer';
import Details from './components/Details';
import Button from './components/Button';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

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
    content: '';
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
const format = `YYYY-MM-DD`;

function App() {
  const [startdate] = useState(_startdate);
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState({});
  const [currentDate, setCurrentDate] = useState(_startdate);

  useEffect(() => {
    axios
      .get(url + currentDate.format(`YYYY-MM-DD`))
      .then(response => {
        // console.log(response.data);
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
    const newCurrentDate = currentDate.clone().subtract(day, 'days');
    setCurrentDate(newCurrentDate);
  };

  const handleNewDate = date => {
    setIsLoading(isLoading => !isLoading);
    setCurrentDate(date);
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
            handleNewDate={handleNewDate}
          />
          <ButtonContainer>
            <Button onClick={handleDateChange} value={1} text={"< Previous Day's Image"} primary />
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
