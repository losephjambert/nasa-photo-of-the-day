import React, { useState, useEffect } from 'react';
import MediaContainer from './components/Media/MediaContainer';
import axios from 'axios';
import moment from 'moment';

const url = `https://api.nasa.gov/planetary/apod?api_key=QYV95kw1NSpdnVcv3dE3zn4UEOlfuhbT69Z2ox3s&date=`;

function App() {
  const [media, setMedia] = useState({});
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const format = `YYYY-MM-DD`;
  console.log(
    'yesterday',
    moment()
      .subtract(1, 'days')
      .format(format)
  );
  console.log('today', moment().format(format));
  console.log(
    'tomorrow',
    moment()
      .add(1, 'days')
      .format(format)
  );

  async function getData(urls) {
    const [previous, current, next] = await Promise.all(urls.map(url => axios.get(url)));
  }

  useEffect(() => {
    const fetchData = async () => {
      // const data = await getData(urls);
    };
    axios
      .get(url)
      .then(response => {
        console.log(response);
        setMedia(prevState => {
          return { ...prevState, currentDay: response.data };
        });
      })
      .catch(error => {
        console.log(`there was an error fetching ${url}`);
        console.error(error);
      });
  }, []);

  return (
    <>
      <MediaContainer media={media} />
    </>
  );
}

export default App;
