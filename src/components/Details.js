import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DateInput = styled.input`
  background-color: transparent;
  color: white;
  font-family: 'Space Mono';
  border: none;
  font-size: 7rem;
  text-align: center;
  display: inline-flex;
  max-width: 95%;
`;
const DetailsTitle = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 50px;
`;
const DetailsP = styled.p`
  max-width: 650px;
  line-height: 1.4;
  font-size: 1.2rem;
  font-family: 'Tiempos';
  margin: auto;
`;

const Details = ({ date, explanation, title, handleNewDate }) => {
  const [dateValue, setDateValue] = useState(date);

  useEffect(() => {
    setDateValue(date);
  }, [date]);

  const handleChange = e => {
    handleNewDate(moment(e.target.value));
  };
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <form action='' onSubmit={e => handleSubmit(e)}>
        <DateContainer>
          <DateInput
            max={moment().format(`YYYY-MM-DD`)}
            type='date'
            defaultValue={dateValue}
            onChange={e => handleChange(e)}
          />
        </DateContainer>
      </form>
      <DetailsTitle>{title}</DetailsTitle>
      <DetailsP>{explanation}</DetailsP>
    </>
  );
};

export default Details;
