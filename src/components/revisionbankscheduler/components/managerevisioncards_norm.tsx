import { useEffect,useState } from "react";
import HeaderRevision from "../../headers/headerrevision"
import { Navigate, useLocation } from "react-router"
import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "react-bootstrap"
export default function ManageRevisionCards(props:any){
    let location = useLocation();
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const statevalue:any = location.state
    const statebool = (statevalue === null) ? false : true // false if token doesnot exist
    const token = (statevalue !== null) ? statevalue.token : (props.token !== undefined) ? props.token : "" 
    const [revisioncarddata,setRevisionCarddata] = useState<any>("");
    const [scheduled,setScheduled] = useState<any>({revisioncardind:-1,scheduled:false});
    const [sentnow,setSentNow] = useState<any>({revisioncardind:-1,scheduled:false});
    const [newrevisioncard,setNewRevisionCard] = useState<any>("");
    const [cardnotchanged,setCardNotChanged] = useState<any>({cardnotchangedind:-1,cardnotchanged:false});
    const [scheduledcardstate,setScheduledCardState] = useState<any>("");
    const [scheduledcardlimithit,setScheduledCardLimitHit] = useState<any>(false);
    const [email,setEmail] = useState<string>("");
    const [changemail,setChangeEmail] = useState<boolean>(false);
    const [newsendtoemail,setNewSendToEmail] = useState<string>("");
    //const [revisioncardchanged,setRevisionCardChanged] = useState<boolean>(false);

    const getrevisioncards = async (token:string) => {
        //console.log(token)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.get(`https://revisionbank.onrender.com/getrevisioncards`,config)
        const responseaccount:any = await axios.get(`https://revisionbank.onrender.com/getaccountinfo`,config)
        setEmail(responseaccount.data.email)
        //setStudentAccountInfo(response.data.result)
        ////console.log(response.data)
        var revisioncarddata = response.data
        //console.log(revisioncarddata)
        //setRevisionCarddata(response.data)
        if (!(Object.keys(response.data).includes("message"))){
            setRevisionCarddata((previousState:any) => {
                //revisioncarddata.revisioncards.reverse()
                //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
                return { ...previousState, revisioncarddata}
                
              });
            
        }

    }
    // TODO : Each Button reqiures an api to do the following
    // TODO Allow change if Interval
    const schedulerevisioncard = async (revisioncard:any,token:string) => {
        //console.log(token)
        //console.log(revisioncard)
        var json = {"sendtoemail":revisioncarddata.revisioncarddata.sendtoemail,"revisionscheduleinterval":revisioncarddata.revisioncarddata.revisionscheduleinterval,"revisioncards":[revisioncard]}
        //console.log(json)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.post(`https://revisionbank.onrender.com/schedulerevisioncard`,json,config)
        ////console.log(response.data)
        const responseaccount:any = await axios.get(`https://revisionbank.onrender.com/getrevisioncards`,config)
        var newrevisioncarddata = responseaccount.data
        //console.log(responseaccount)
        
        //console.log(config)
        setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            return { ...previousState, newrevisioncarddata}
            
          });
          
        
    }
    const unschedulerevisioncard = async (revisioncard:any,token:string) => {
        //console.log(token)
        //console.log(revisioncard)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.post(`https://revisionbank.onrender.com/unschedulerevisioncard`,revisioncard,config)
        ////console.log(response.data)
        const responseaccount:any = await axios.get(`https://revisionbank.onrender.com/getrevisioncards`,config)
        var newrevisioncarddata = responseaccount.data
        //console.log(responseaccount)
        
        //console.log(config)
        setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            return { ...previousState, newrevisioncarddata}
            
          });
    }
    const checkschedulerevisioncard = async (token:string) => {
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.get(`https://revisionbank.onrender.com/checkschedulerevisioncard`,config)
        setScheduledCardState(response.data)
        ////console.log(response.data)
    }
    const changerevisioncard = async (revisioncardind:number,prevrevisioncard:any,newrevisioncard:any,token:string) => {
        //if (n)
        if (newrevisioncard === ""){
            setCardNotChanged((items:any)=> ({...cardnotchanged,cardnotchangedind:revisioncardind,cardnotchanged:true}))
        }
        else if(newrevisioncard !== ""){
            const newrevisioncardjson = {"revisioncard":prevrevisioncard.revisioncard,"newrevisioncard": newrevisioncard.newrevisoncard,"revisioncardtitle": prevrevisioncard.revisioncardtitle,"subject": prevrevisioncard.subject}
            //console.log(newrevisioncardjson)
            const config = {headers: {Authorization: `Bearer ${token}`,}}
            const response:any = await axios.post(`https://revisionbank.onrender.com/changerevisioncard`,newrevisioncardjson,config)
            ////console.log(response.data)
            const responseaccount:any = await axios.get(`https://revisionbank.onrender.com/getrevisioncards`,config)
            var newrevisioncarddata = responseaccount.data
            //console.log(newrevisioncarddata)
            
            //console.log(config)
            setRevisionCarddata((previousState:any) => {
                //revisioncarddata.revisioncards.reverse()
                //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
                return { ...previousState, newrevisioncarddata}
                
              });
            setNewRevisionCard("")
        }
          
    }
    const changesendtoemail = async (e:any) => {
        //if (n)
        e.preventDefault();
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        var json = {"sendtoemail":newsendtoemail}
        //console.log(json)
        const response:any = await axios.put(`https://revisionbank.onrender.com/changesendtoemail`,json,config)
        const responseaccount:any = await axios.get(`https://revisionbank.onrender.com/getrevisioncards`,config)
        var newrevisioncarddata = responseaccount.data
        ////console.log(responseaccount)
        
        //console.log(config)
        setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            return { ...previousState, newrevisioncarddata}
            
          });
        ////console.log(response.data)
        //window.location.reload();

    }
          
    const sendnowrevisioncard = async (revisioncard:any,token:string) => {        
        var json = {"sendtoemail":revisioncarddata.revisioncarddata.sendtoemail,"revisionscheduleinterval":revisioncarddata.revisioncarddata.revisionscheduleinterval,"revisioncards":[revisioncard]}
        //console.log(json)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.post(`https://revisionbank.onrender.com/sendnowrevisioncard`,json,config)
        ////console.log(response.data)

    }
    const removerevisioncard = async (revisioncard:any,token:string) => {
        //console.log(token)
        //console.log(revisioncard)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        //var json = {"removerevisioncard":revisioncard}
        const response:any = await axios.post(`https://revisionbank.onrender.com/removerevisioncard`,revisioncard,config)
        //console.log(response.data)
        const responseaccount:any = await axios.get(`https://revisionbank.onrender.com/getrevisioncards`,config)
        var newrevisioncarddata = responseaccount.data
        //console.log(responseaccount)
        
        //console.log(config)
        setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            return { ...previousState, newrevisioncarddata}
            
          });
        //window.location.reload()
        
    }
    const checkrevisecard = (revisioncard:any,scheduledcards:any) => {
        if (scheduledcards.revisioncards !== undefined){
            if (scheduledcards.revisioncards.length > 0){
                
                for (var i = 0; i < scheduledcards.revisioncards.length; i++){
                    if(scheduledcards.revisioncards[i].revisioncard === revisioncard.revisioncard){
                        return true
                    }
                }
            }
            else {
                return false
            }
        }
    }
    
    useEffect(() => {
        //Runs only on the first render
        getrevisioncards(token)
        checkschedulerevisioncard(token)
      },[scheduled]);
      //console.log(email)
      var revisionscheduleinterval = (revisioncarddata !== "") ? revisioncarddata.revisioncarddata.revisionscheduleinterval : "No Revision Cards"
      var sendtoemail = (revisioncarddata !== "") ? revisioncarddata.revisioncarddata.sendtoemail : "No Revision  Cards"
      var revisioncards = (revisioncarddata !== "") ? revisioncarddata.revisioncarddata.revisioncards : []
      var scheduledcards = (scheduledcardstate !== "") ? scheduledcardstate : []

    //console.log(revisioncards)
    return(
        <div>
            {statebool ?
            <div>
            {props.splitscreen == true ? null: <HeaderRevision token={token}/> }
            
            <div style={{display:props.splitscreen ? "relative":"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:props.splitscreen ? "0px":"50px"}}>
                {props.splitscreen == true ? null: 
                <div>
                <h1 style={{color:"white",marginBottom:"20px"}}>Revision Cards</h1>
                </div>
                }

                <div style={{position:"relative",border:"3px white solid",borderRadius: props.splitscreen ? "0px":"10px",backgroundColor:"white",width: maxRowBased ? props.splitscreen ? "70vh":"100vh" : "60vh"}}>
                    <div style={{position:"relative",left:"10%",top:"10%",width: "80%",border:"1px grey solid",borderRadius:"5px"}}>
                        <div style={{margin:"20px"}}>
                            <div style={{display:"flex",gap:"7%",borderBottom:"1px grey solid",flexDirection:maxRowBased ? "row":"column"}}>
                                <p style={{color:"grey"}}>Email to send to:</p>
                                <p >{sendtoemail}</p>
                                {changemail ?
                                <div>
                                    <form style={{width:"2%",height:"100px"}} onSubmit={changesendtoemail}>
                                        <input placeholder= "New Email" type="text" value={newsendtoemail} onChange={(e) => {setNewSendToEmail(e.target.value)}}/>
                                        <CloseIcon style={{position:"relative",right:"0px"}} onClick={(e:any) => {setChangeEmail(false)}} ></CloseIcon>
                                    </form>
                                    

                                </div>:
                                <Button style={{fontSize:"10px",marginBottom:"20px",height:"40px"}} onClick={() => {setChangeEmail(true)}}>Change email</Button>}
                            </div>
                            
                            <div style={{display:"flex",gap:"10%",borderBottom:"1px grey solid",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                                <p style={{color:"grey"}}>Revision Interval</p>
                                <p>{revisionscheduleinterval} minutes</p>
                            </div>
                            <div style={{display:"flex",gap:"10%",borderBottom:"1px grey solid",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Manage Revision Cards:</p>
                            </div>
                            {/*TODO Dynamically display the revision cards*/}
                            {revisioncards !== []  && !revisioncards.includes(undefined) && revisioncards.map((revisioncard:any,index:any) => {
                                var revboole = checkrevisecard(revisioncard,scheduledcards)                       
                                return(
                                <div>
                                    <div key={index} style={{display:"flex",marginTop:"50px",flexDirection:maxRowBased ? "row":"column",justifyContent: "space-between"}}>
                                        <p >{revisioncard.subject}</p>
                                        <p style={{marginRight:"40px"}}>{revisioncard.revisioncardtitle}</p>
                                    </div>
                                    <textarea onChange={(e:any) => {setNewRevisionCard((items:any)=> ({...index,revisioncardind:index,newrevisoncard:e.target.value}))} } defaultValue={revisioncard.revisioncard} name="revisioncard" className="form-control" style={{height: "200px",width:"95%",marginTop:"10px"}}>
                                    </textarea>
                                    <div style={{display:"flex",marginTop:"10px",flexDirection:maxRowBased ? "row":"row",justifyContent: "space-between"}}>
                                    {newrevisioncard.revisioncardind === index && newrevisioncard.newrevisoncard  !== "" && <Button onClick={() => {changerevisioncard(index,revisioncard,newrevisioncard,token)}} style={{backgroundColor:"#00008B",width:"100px",border:"1px solid #00008B",height:"30px",fontSize:"13px"}}>Submit</Button>}
                                    <Button onClick={() => {removerevisioncard(revisioncard,token)}} style={{backgroundColor:"#dc3545",width:"100px",border:"1px solid #dc3545",height:"30px",fontSize:"13px",marginRight:maxRowBased ?"17px":"10px"}}>Remove</Button>
                                    
                                    </div>
                                    {/*|| scheduledcards.revisioncards.includes(revisioncard) */ }
                                    
                                    {(scheduled.revisioncardind === index && scheduled.scheduled === true )|| revboole === true ? //

                                    <Button onClick={() => {unschedulerevisioncard(revisioncard,token);setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:false}))}} style={{backgroundColor:"#fa0095",marginTop:"10px",width:"100px",border:"1px solid #fa0095",height:"30px",fontSize:"13px",marginRight:maxRowBased ?"17px":"10px"}}>Scheduled</Button>
                                    :
                                     
                                    scheduledcards.revisioncards !== undefined ? 
                                    scheduledcards.revisioncards.length < 3 ? /* 5  */
                                    <div>
                                    <Button onClick={() => {schedulerevisioncard(revisioncard,token);setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{backgroundColor:"grey",marginTop:"10px",width:"100px",border:"1px solid grey",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Unscheduled</Button>
                                    { email === "amari.lawal05@gmail.com"  &&
                                    sentnow.revisioncardind === index && sentnow.scheduled === true ?
                                    <Button onClick={() => {setSentNow((items:any)=> ({...index,revisioncardind:index,scheduled:false}))}} style={{marginTop:"10px",width:"100px",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Sent!</Button>
                                    :
                                    <Button onClick={() => {sendnowrevisioncard(revisioncard,token);setSentNow((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{marginTop:"10px",width:"100px",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Send Now!</Button>
                                    }
                                    </div>
                                    :
                                    <Button onClick={() => {setScheduledCardLimitHit(true)}} style={{backgroundColor:"grey",marginTop:"10px",width:"100px",border:"1px solid grey",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Unscheduled</Button>
                                    :
                                    <Button onClick={() => {schedulerevisioncard(revisioncard,token);setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{backgroundColor:"grey",marginTop:"10px",width:"100px",border:"1px solid grey",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Unscheduled</Button>
                                }
                                    {cardnotchanged.cardnotchangedind === index && cardnotchanged.cardnotchanged === true && <p>Card Not changed.</p>}
                                    
                                </div>
                                )
                            })}
                            {scheduledcardlimithit === true && <p>Schedule of 5 revison cards Limit Hit</p>}


                        </div>
                    </div>
                </div>
            </div>
    
            </div>:
            <div>
            <Navigate to="/"/>
            </div>}
        </div>

    )
}