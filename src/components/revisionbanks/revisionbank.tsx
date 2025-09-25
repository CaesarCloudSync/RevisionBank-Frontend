import Button from '@mui/material/Button';
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import { useLocation,useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import HeaderScraper from '../headers/headerscraper';
import Policies from '../homepage/components/policies';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import FeedIcon from '@mui/icons-material/Feed';
import "./revisionbank.css"
class RevisionBankOptionsStyles{
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
    this.title = {color:"#335eea",marginBottom:"-20px"}
    this.containercenter = {display:"flex",justifyContent: maxRowBased  ? "center": "center",gap:"20%",flexDirection: maxRowBased ? 'row' : 'column',alignItems: "center"};
    this.rowitem = {marginTop: maxRowBased ? "auto": "2rem"}
    this.cardcontainer = {display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"20%", marginTop: "10rem"}
    this.buttonflex =  {display:"flex",flexDirection:"column", gap:"40px"}
    this.button = {height:"50px"}
    this.buttontxt = {fontSize:"15px",marginTop:"6px"}
    
  }
}

function RevisionBankOptions() {
  const [subscriptionpresent,setSubscriptionpresent] = useState(false);
  const maxRowBased = useMediaQuery(maxRowBasedquery);
  const styles = new RevisionBankOptionsStyles(maxRowBased);
  const current_date = new Date()
  const location:any = useLocation() //.state
  const statevalue:any = location.state
  const statebool = (statevalue === null) ? false : true // false if token doesnot exist
  const token = (statevalue !== null) ? statevalue.token : "" 
  const [hideComponent,setHideComponent] = useState(false)
  //const subscription = (statevalue !== null) ? statevalue.subscription : "" 
  const navigate = useNavigate();
  const sendTokenBool = (token:string,route:string) => {
    navigate(route,{state:{token:token}})
  }
  //console.log(statevalue)
  // TODO - When this page is opened collect data from database and and check if end_date is greater than current date. 
  //console.log(statevalue)
  const getsubscription = async (token:string) => {
    const config = {headers: {Authorization: `Bearer ${token}`,}}
    const responseget:any = await axios.get(`https://revisionbankbackend-qqbn26mgpa-uc.a.run.app/getsubscription`,config); // Send login post request.
    console.log(responseget.data)
    if (responseget.data.end_date_subscription === undefined) {
      const responsegetstudent:any = await axios.get(`https://revisionbankbackend-qqbn26mgpa-uc.a.run.app/checkstudentsubscriptions`,config);
      //console.log(responsegetstudent.data)
      // TODO This allows the free version
      setSubscriptionpresent(true)
      if (responsegetstudent.data.student_subscription === "student educational") {
        setSubscriptionpresent(true)
      }
      else if (responsegetstudent.data.student_subscription === "student educational") {
      setSubscriptionpresent(false)
    }} 
    else if (responseget.data.end_date_subscription !== undefined){
      setSubscriptionpresent(true)
    }
  }
  useEffect(() => {
    getsubscription(token)
  }, [])

  function DownloadChromeExtensionPrompt(props:any){
    if (props.subscriptionpresent){
    return(     
      <div style={{position:"absolute",backgroundColor:"#335eea",width:"200px",height:"100px",borderRadius:"10px",right:"40px",top:"50px"}}>
        <div style={{margin:"10px"}}>
          <p style={{color:"white",fontSize:"13px"}}>Download RevisionBank Card Scanner Chrome Extension</p>
          <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
          <a href='https://chrome.google.com/u/5/webstore/devconsole/register?hl=en-GB'  target="_blank" rel="noopener noreferrer">
          <DownloadIcon style={{color:"white",width:"20px",height:"20px"}}></DownloadIcon>
          </a>
          </div>
        </div>
      </div>
      )
    }
    else{
      <div></div>
    }
  }

  return(
    <div>
      {statebool ? 
      <div>
      <HeaderScraper token={token}/>
      <div style={styles.titlecontainer}>
        <h2 style={styles.title}>RevisionBank</h2>
      </div>
      <div onClick={() => {navigate("/feedback")}} style={{position:"absolute",right:"130px"}}>
        <div  className='feedbackformbutton' style={{position:"absolute",top:"-10px",right:"-13px",width: "30px",transform: "rotate(45deg)",height: "30px",background: "conic-gradient(at 50% 50%,transparent 135deg,#161e79 0,#161e79 225deg, transparent 0)"}}></div>
        
        <FeedIcon style={{color:"white"}} sx={{ fontSize: 70 }} ></FeedIcon>
        <h2  style={{position:"absolute",fontSize:"15px"}} >Complete FeedBack Form</h2>
      </div>

      {maxRowBased ? 
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:maxRowBased ? "10px" : "2px",flexDirection: maxRowBased ? "row" : "column"}}>
            <div style={styles.cardcontainer}>
              <Card
                bg={'Light'}
                key={0}
                text={'dark'}
                style={{ width: '40rem'}}
                className="mb-2"
              >
                <Card.Header>RevisionBank</Card.Header>
                <Card.Body>
                  <Card.Title>RevisionBank Tools</Card.Title>
                  <Card.Text>
                  
                  <div style={styles.buttonflex}>
                    {subscriptionpresent && <Button style={styles.button} onClick={() => sendTokenBool(token,'/revisionbanknotecard')} variant="contained"><p style={styles.buttontxt}>RevisionBank Notecards</p></Button>}
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/physicsocr')} variant="contained"><p style={styles.buttontxt}>Physics OCR</p></Button>
                    
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/edexcelmaths')}  variant="contained"><p style={styles.buttontxt}>Edexcel Maths Papers</p></Button>
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/chemistryaqa')} variant="contained"><p style={styles.buttontxt}>Chemistry AQA</p></Button>
                    {hideComponent &&
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/fmathqp')}  variant="contained"><p style={styles.buttontxt}>Furthermath Question Papers</p></Button>
                    } 
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div style={styles.cardcontainer}>
              <Card
                bg={'Light'}
                key={0}
                text={'dark'}
                style={{ width: '40rem'}}
                className="mb-2"
              >
                <Card.Header>RevisionBank</Card.Header>
                <Card.Body>
                  <Card.Title>RevisionBank Tools</Card.Title>
                  <Card.Text>
                  
                  <div style={styles.buttonflex}>
                    
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/ocrscience')} variant="contained"><p style={styles.buttontxt}>OCR sciences</p></Button>
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/physicsaqa')} variant="contained"><p style={styles.buttontxt}>Physics AQA</p></Button>
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/computerscienceaqa')} variant="contained"><p style={styles.buttontxt}>Computer Science AQA</p></Button>
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/biologyaqa')} variant="contained"><p style={styles.buttontxt}>Biology AQA</p></Button>
                    {hideComponent &&
                    <Button style={styles.button} onClick={() => sendTokenBool(token,'/fmathsb')} variant="contained"><p style={styles.buttontxt}>Furthermath Solution Bank</p></Button>
                    }
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          :
          <div style={styles.cardcontainer}>
          <Card
            bg={'Light'}
            key={0}
            text={'dark'}
            style={{ width: '40rem'}}
            className="mb-2"
          >
            <Card.Header>RevisionBank</Card.Header>
            <Card.Body>
              <Card.Title>RevisionBank Tools</Card.Title>
              <Card.Text>
              
              <div style={styles.buttonflex}>
                {subscriptionpresent && <Button style={styles.button} onClick={() => sendTokenBool(token,'/revisionbanknotecard')} variant="contained"><p style={styles.buttontxt}>RevisionBank Notecards</p></Button>}
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/physicsocr')} variant="contained"><p style={styles.buttontxt}>Physics OCR</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/edexcelmaths')}  variant="contained"><p style={styles.buttontxt}>Edexcel Maths Papers</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/computerscienceaqa')} variant="contained"><p style={styles.buttontxt}>Computer Science AQA</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/fmathqp')}  variant="contained"><p style={styles.buttontxt}>Furthermath Question Papers</p></Button>                   
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/ocrscience')} variant="contained"><p style={styles.buttontxt}>OCR sciences</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/physicsaqa')} variant="contained"><p style={styles.buttontxt}>Physics AQA</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/chemistryaqa')} variant="contained"><p style={styles.buttontxt}>Chemistry AQA</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/biologyaqa')} variant="contained"><p style={styles.buttontxt}>Biology AQA</p></Button>
                <Button style={styles.button} onClick={() => sendTokenBool(token,'/fmathsb')} variant="contained"><p style={styles.buttontxt}>Furthermath Solution Bank</p></Button>
              
              </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
          
          }
      <Policies></Policies>
      </div>
      :
      <div>
      <Navigate to="/"/>
      </div>}

    </div>
  )
}

export default RevisionBankOptions;
