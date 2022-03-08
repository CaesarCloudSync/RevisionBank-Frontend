import React from 'react';
import styled from 'styled-components'
import Button from '@mui/material/Button';
import useMediaQuery from "./useMedia";
import { maxRowBasedquery } from "./mediamax";
const Row = styled.div`
  display: flex;
  :nth-child(1){
    justify-content: center;
  }
  :nth-child(2){
    margin-left : 10%;
    gap: 20%;
  }
  `
class HomepageStyles{
  containercenter:Object;
  rowitem:Object;
  constructor(maxRowBased:any){
    this.containercenter = {display:"flex",justifyContent: maxRowBased  ? "center": "center",gap:"20%",flexDirection: maxRowBased ? 'row' : 'column',alignItems: "center"};
    this.rowitem = {marginTop: maxRowBased ? "auto": "2rem"}
  }
}
/*
      : <div>
        <Row>
        <h2>PhysicsMathsTutorScrape</h2>
        </Row>
      </div>
      } */
function Homepage() {
  const maxRowBased = useMediaQuery(maxRowBasedquery);
  const styles = new HomepageStyles(maxRowBased);
  return(
    <div>

      <div>
      <Row>
        <h2>PhysicsMathsTutorScrape</h2>

      </Row>
      <div style={styles.containercenter}> 
        <div style={styles.rowitem}>
          <Button href="/fmathqp" variant="contained">FmathQP</Button>
        </div>
        <div style={styles.rowitem}>
          <Button href="/fmathsb" variant="contained">FmathSB</Button>
        </div>
        <div style={styles.rowitem}>
          <Button href="/physicsaqa" variant="contained">Physicsaqa</Button>
        </div>
        <div style={styles.rowitem}>
          <Button href="/ocrscience" variant="contained">OCRsciences</Button>
        </div>

      </div>
      </div>

    </div>
  )
}

export default Homepage;
