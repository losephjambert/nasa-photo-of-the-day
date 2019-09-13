import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DateInput = styled.input`
  background-color: transparent;
  color: white;
  font-family: "Space Mono";
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
  font-family: "Tiempos";
  margin: auto;
`;

const Details = ({ date, explanation, title }) => {
  const [dateValue, setDateValue] = useState(date);

  useEffect(() => {
    setDateValue(date);
  }, [date]);

  const handleChange = e => setDateValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("get new photo with this date: ", dateValue);
  };

  return (
    <>
      <form action="" onSubmit={e => handleSubmit(e)}>
        <DateContainer>
          <DateInput
            type="text"
            value={dateValue}
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
