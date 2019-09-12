import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => (props.primary ? 'white' : 'black')};
`;

const Button = ({ onClick, text, value, disabled, primary }) => {
  return (
    <StyledButton onClick={() => onClick(value)} primary={primary} disabled={disabled}>
      {text}
    </StyledButton>
  );
};
export default Button;
