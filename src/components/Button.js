import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => (props.primary ? "black" : "white")};
  color: ${props => (props.primary ? "white" : "black")};
  outline: none;
  border: none;
  box-shadow: 0 0 0 2px white;
  padding: 10px 20px;
  &:disabled {
    color: grey;
    box-shadow: 0 0 0 2px grey;
  }
  &:disabled:hover {
    cursor: not-allowed;
  }
`;

const Button = ({ onClick, text, value, disabled, primary }) => {
  return (
    <StyledButton
      onClick={() => onClick(value)}
      primary={primary}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
};
export default Button;
