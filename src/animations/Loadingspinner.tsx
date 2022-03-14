import React from "react";
import styled, {keyframes} from "styled-components";
//https://contactmentor.com/how-to-add-loading-spinner-react-js/
const spinner = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`
const LoadingSpinnerDiv = styled.div`
width: 50px;
height: 50px;
border: 10px solid royalblue; /* Light grey */
border-top: 10px solid #383636; /* Blue */
border-radius: 50%;
animation: ${spinner} 1.5s linear infinite;
`
const SpinnerContainer = styled.div`
display: grid;
justify-content: center;
align-items: center;
height: 100px;
`
function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <LoadingSpinnerDiv></LoadingSpinnerDiv>
    </SpinnerContainer>
  );
}

export default LoadingSpinner