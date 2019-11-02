import React from 'react';
import styled from 'styled-components'

const Foot = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-weight: 100;
    font-size: 6pt;
    user-select: none;
`


const Footer = (props) => {

  return (
    <Foot>
      Designed and developed by Muhammed Hasan in London, UK
    </Foot>
  );
}

export default Footer