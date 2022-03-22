import Button from '@mui/material/Button';
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks//mediamax";
import { useLocation,useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';


class STEMScraperOptionsStyles{
  containercenter:Object;
  rowitem:Object;
  cardcontainer:Object;
  button:Object;
  buttontxt:Object;
  buttonflex:Object;
  title:Object;
  titlecontainer:Object;
  constructor(maxRowBased:any){
    this.titlecontainer = { display: "flex",justifyContent: "center",marginTop:"50px"}
    this.title = {color:"#335eea"}
    this.containercenter = {display:"flex",justifyContent: maxRowBased  ? "center": "center",gap:"20%",flexDirection: maxRowBased ? 'row' : 'column',alignItems: "center"};
    this.rowitem = {marginTop: maxRowBased ? "auto": "2rem"}
    this.cardcontainer = {display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"20%", marginTop: "10rem"}
    this.buttonflex =  {display:"flex",flexDirection:"column", gap:"40px"}
    this.button = {height:"50px"}
    this.buttontxt = {fontSize:"15px",marginTop:"6px"}
    
  }
}

function STEMScraperOptions() {
  const maxRowBased = useMediaQuery(maxRowBasedquery);
  const styles = new STEMScraperOptionsStyles(maxRowBased);
  const current_date = new Date()
  //let navigate:any = useNavigate();
  const location:any = useLocation() //.state
  const statevalue:any = location.state
  const statebool = (statevalue === null) ? false : true // false if token doesnot exist
  const token = (statevalue !== null) ? statevalue.token : "" 
  const subscription = (statevalue !== null) ? statevalue.subscription : "" 
  //console.log(statevalue)
  const navigate = useNavigate();
  const sendTokenBool = (token:string,route:string) => {
    navigate(route,{state:{token:token}})
  }
  //console.log(token)
  // TODO - When this page is opened collect data from database and and check if end_date is greater than current date. 




  return(
    <div>
      {statebool ? 
      <div>
      <div style={styles.titlecontainer}>
        <h2 style={styles.title}>PhysicsMathsTutorScrape</h2>
      </div>

      <div style={styles.cardcontainer}>
        <Card
          bg={'Light'}
          key={0}
          text={'dark'}
          style={{ width: '40rem'}}
          className="mb-2"
        >
          <Card.Header>STEMTutorBank</Card.Header>
          <Card.Body>
            <Card.Title>STEMTutorBank Tools</Card.Title>
            <Card.Text>
            <div style={styles.buttonflex}>
              <Button style={styles.button} onClick={() => sendTokenBool(token,'/fmathqp')}  variant="contained"><p style={styles.buttontxt}>FurthermathQP</p></Button>
              <Button style={styles.button} onClick={() => sendTokenBool(token,'/fmathsb')} variant="contained"><p style={styles.buttontxt}>FurthermathSB</p></Button>
              <Button style={styles.button} onClick={() => sendTokenBool(token,'/physicsaqa')} variant="contained"><p style={styles.buttontxt}>Physicsaqa</p></Button>
              <Button style={styles.button} onClick={() => sendTokenBool(token,'/ocrscience')} variant="contained"><p style={styles.buttontxt}>OCRsciences</p></Button>
            </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      </div>
      :
      <div>
      <Navigate to="/"/>
      </div>}

    </div>
  )
}

export default STEMScraperOptions;
