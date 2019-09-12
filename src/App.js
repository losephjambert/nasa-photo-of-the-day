import React, { useState, useEffect } from 'react';
import MediaContainer from './components/Media/MediaContainer';
import axios from 'axios';
import moment from 'moment';

const startdate = new moment();
const url = `https://api.nasa.gov/planetary/apod?api_key=QYV95kw1NSpdnVcv3dE3zn4UEOlfuhbT69Z2ox3s&date=`;

function App() {
  const format = `YYYY-MM-DD`;

  const [media, setMedia] = useState({});
  const [currentDate, setCurrentDate] = useState(startdate);
  // const [dateWindow, setDateWindow] = useState([null, null, null]);

  async function getData(urls) {
    let [previous, current, next] = await Promise.all(urls.map(url => axios.get(url)));
  }

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getData([currentDate]);
    // };
    // axios
    //   .get(url + currentDate.format(`YYYY-MM-DD`))
    //   .then(response => {
    //     setMedia(response.data);
    //   })
    //   .catch(error => {
    //     console.log(`there was an error fetching ${url}`);
    //     console.error(error);
    //   });

    // handleDateWindow(currentDate);
    const currentDateMinus1 = currentDate.clone().subtract(1, 'days');
    const currentDateClone = currentDate.clone();
    const currentDatePlus1 = currentDate.clone().add(1, 'days');
    const dateWindow = [currentDateMinus1, currentDateClone, currentDatePlus1].map(date =>
      axios.get(url + date.format(`YYYY-MM-DD`))
    );

    const dateWindowResolved = dateWindow.map(window => window.catch(err => ({ err })));
    const checkIfRequestFailed = then => {
      return function(responses) {
        const failed = responses.some(response => response.error);

        if (failed) throw responses;

        return then(responses);
      };
    };
    axios
      .all(dateWindowResolved)
      .then(
        checkIfRequestFailed((...dateWindow) => {
          console.log('success', ...dateWindow);
        })
      )
      .catch(err => {
        console.log('there was an error fetching that url');
        console.error(err);
      });
    // axios.all(dateWindow.map(url => axios.get(url))).then(
    //   axios.spread((previous, current, next) => {
    //     console.log(previous, current, next);
    //   })
    // );
    // dateWindow.forEach(url => {
    //   axios
    //     .get(url)
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // });

    // setDateWindow([currentDateMinus1, currentDateClone, currentDatePlus1]);
  }, [currentDate]);

  const handleDateChange = day => {
    const newCurrentDate = currentDate.clone().subtract(day, 'days');
    setCurrentDate(newCurrentDate);
  };

  // const handleDateWindow = currentDate => {
  //   const currentDateMinus1 = currentDate.clone().subtract(1, 'days');
  //   const currentDatePlus1 = currentDate.clone().add(1, 'days');
  //   const currentDateClone = currentDate.clone();
  //   setDateWindow([currentDateMinus1, currentDateClone, currentDatePlus1]);
  // };

  return (
    <>
      <MediaContainer media={''} />
      <p>current date: {currentDate.format(format)}</p>
      {/* {dateWindow.map((date, i) => (
        <span key={i}>{date && date.format(format)} </span>
      ))} */}
      <div>
        <button onClick={() => handleDateChange(1)}>Previous Day</button>
        <button onClick={() => handleDateChange(-1)} disabled={currentDate.format(format) === moment().format(format)}>
          Next Day
        </button>
      </div>
    </>
  );
}

export default App;
