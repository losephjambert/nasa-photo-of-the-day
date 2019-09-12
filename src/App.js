import React, { useState, useEffect } from 'react';
import MediaContainer from './components/Media/MediaContainer';
import axios from 'axios';
import moment from 'moment';

const url = `https://api.nasa.gov/planetary/apod?api_key=QYV95kw1NSpdnVcv3dE3zn4UEOlfuhbT69Z2ox3s&date=`;

function App() {
  const format = `YYYY-MM-DD`;

  const [media, setMedia] = useState({});
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [dateWindow, setDateWindow] = useState([null, null, null]);

  // async function getData(arr) {
  //   const [previous, current, next] = await Promise.all(
  //     arr.map(item => axios.get(item))
  //   );
  // }

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getData([currentDate]);
    // };
    axios
      .get(url + currentDate.format(`YYYY-MM-DD`))
      .then(response => {
        setMedia(response.data);
      })
      .catch(error => {
        console.log(`there was an error fetching ${url}`);
        console.error(error);
      });
  }, [currentDate]);

  useEffect(() => {
    setCurrentDate(moment().subtract(currentDateIndex, 'days'));
    setDateWindow([
      moment().subtract(currentDateIndex - 1, 'days'),
      moment().subtract(currentDateIndex, 'days'),
      moment().subtract(currentDateIndex + 1, 'days'),
    ]);
  }, [currentDateIndex]);

  console.log(...dateWindow);

  return (
    <>
      <MediaContainer media={media} />
      <p>{currentDate.format(`YYYY-MM-DD`)}</p>
      <button onClick={() => setCurrentDateIndex(currentDateIndex + 1)}>Previous Day</button>
      <button
        onClick={() => setCurrentDateIndex(currentDateIndex - 1)}
        disabled={currentDate.format(`YYYY-MM-DD`) === moment().format(`YYYY-MM-DD`)}>
        Next Day
      </button>
    </>
  );
}

export default App;
