import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Details = ({ date }) => {
  return <p>{date.format(`YYYY-MM-DD`)}</p>;
};

export default Details;
