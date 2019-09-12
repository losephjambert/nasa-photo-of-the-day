import React, { useState, useEffect } from 'react';
import MediaContainer from './components/Media/MediaContainer';
import axios from 'axios';
import moment from 'moment';

const url = `https://api.nasa.gov/planetary/apod?api_key=QYV95kw1NSpdnVcv3dE3zn4UEOlfuhbT69Z2ox3s&date=`;

function App() {
  const format = `YYYY-MM-DD`;

  const [media, setMedia] = useState({});
  const [currentDate, setCurrentDate] = useState(moment(new Date()));
  const [count, setCount] = useState(0);

  async function getData(urls) {
    const [previous, current, next] = await Promise.all(urls.map(url => axios.get(url)));
  }
  console.log(currentDate.format(format));

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getData(urls);
    // };
    axios
      .get(url + currentDate.format(`YYYY-MM-DD`))
      .then(response => {
        setMedia(prevState => {
          return { ...prevState, currentDay: response.data };
        });
      })
      .catch(error => {
        console.log(`there was an error fetching ${url}`);
        console.error(error);
      });
  }, [currentDate]);

  useEffect(() => {
    setCurrentDate(moment().subtract(count, 'days'));
  }, [count]);

  return (
    <>
      <MediaContainer media={media} />
      <button onClick={() => setCount(count => count++)}>Yesterday</button>
    </>
  );
}

export default App;
