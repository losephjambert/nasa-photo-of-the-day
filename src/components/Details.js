import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DetailsContainer = styled.section`
  width: 95%;
  margin: auto;
  padding-top: 12.5vh;
  position: relative;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-color: white;
  &::before,
  &::after {
    content: "";
    width: 2.5vw;
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
  font-size: 3rem;
  text-align: center;
`;
const DetailsP = styled.p`
  max-width: 650px;
  line-height: 1.2;
  font-size: 1.4rem;
`;

const Details = ({ date, explanation, title }) => {
  const [dateValue, setDateValue] = useState(date);
  const handleChange = e => setDateValue(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    console.log("get new photo with this date: ", dateValue);
  };
  return (
    <DetailsContainer>
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
    </DetailsContainer>
  );
};

export default Details;
