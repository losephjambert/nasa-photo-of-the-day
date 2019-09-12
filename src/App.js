import React, { useState, useEffect } from 'react';
import MediaContainer from './components/Media/MediaContainer';
import axios from 'axios';
import moment from 'moment';

const _startdate = new moment();
const url = `https://api.nasa.gov/planetary/apod?api_key=QYV95kw1NSpdnVcv3dE3zn4UEOlfuhbT69Z2ox3s&date=`;

function App() {
  const format = `YYYY-MM-DD`;
  const [startdate] = useState(_startdate);
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState({});
  const [currentDate, setCurrentDate] = useState(_startdate);

  useEffect(() => {
    axios
      .get(url + currentDate.format(`YYYY-MM-DD`))
      .then(response => {
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

  return (
    <>
      <MediaContainer media={media} isLoading={isLoading} />
      <p>current date: {currentDate.format(format)}</p>
      <div>
        <button onClick={() => handleDateChange(1)}>Previous Day</button>
        <button onClick={() => handleDateChange(-1)} disabled={currentDate.format(format) === startdate.format(format)}>
          Next Day
        </button>
      </div>
    </>
  );
}

export default App;
