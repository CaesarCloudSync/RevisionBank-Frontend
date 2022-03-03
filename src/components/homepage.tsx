import React from 'react';
import styled from 'styled-components'
import Button from '@mui/material/Button';
const Row = styled.div`
  display: flex;
  :nth-child(1){
    justify-content: center;
  }
  :nth-child(2){
    margin-left : 20%;
    gap: 55%;
  }
  `
function Homepage() {
  return(
    <div>
      <Row>
        <h2>PhysicsMathsTutorScrape</h2>

      </Row>
      <Row> 
        <div>
          <Button href="/fmathqp" variant="contained">FmathQP</Button>
        </div>
        <div>
          <Button href="/fmathsb" variant="contained">FmathSB</Button>
        </div>

      </Row>
    </div>
  )
}

export default Homepage;
