import { useEffect,useState } from "react";
import HeaderRevision from "../../headers/headerrevision"
import { Navigate, useLocation } from "react-router"
import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import axios from "axios";
import { useAlert } from 'react-alert'
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button } from "react-bootstrap"
import ManageRevisionCardsInfo from "./managerevisioncardsinfo";
import LensIcon from '@mui/icons-material/Lens';
import ShareAlert from "./sharealert";
export default function ManageRevisionCards(props:any){
    let location = useLocation();
    const reactalert = useAlert()
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
    const [manualscheduling,setManualScheduling] = useState(true)
    const [accountinfo,setAccountInfo] = useState()
    const [showpickedtrafficlightind,setShowPickedTrafficLightind] = useState<any>([{color:"none",showpickedtrafficlightind:-1,pickedtrafficlightind:false}])
    const [allowtrafficlights,setAllowTrafficLights] = useState(false)
    const [allowedmaximumscheduledcards,setAllowedMaximumScheduledCards] = useState(3)
    const [shareshow,setShareShow] = useState(false)
    const [shareurl,setShareURL] = useState("")
    const [revisioncardswebsocket,setRevisionCardWebSocket] = useState<any>([])

    

    //console.log(manualpagecookie)
    //const [pickedtrafficlightcss,setShowPickedTrafficLightcss] = useState({border:"3px solid black",borderRadius:"20px"})
    //const [revisioncardchanged,setRevisionCardChanged] = useState<boolean>(false);
   
    const onTrafficLightColorClick = async (color:string,index:any,token:string,revisioncard:any,revisioncardcolor:any) => {

        //console.log()
        let data:any = [...showpickedtrafficlightind];
        //console.log(data[index]["color"],color,revisioncardcolor)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        //console.log(data[index]["color"],color,revisioncardcolor,"bob")
        // There are no already picked colors, first case

        if (revisioncardcolor === false && (color !== "none" && color !== revisioncardcolor)){
            revisioncard["color"] = color
            data[index]["color"] = color;
            data[index]["showpickedtrafficlightind"] = index;
            data[index]["pickedtrafficlightind"] = true;
            //console.log(showpickedtrafficlightind)
            const maxtrafficlight = showpickedtrafficlightind.map((items:any) => {if (items.color !== "none") {return(true)} else {return(false)}}).filter((v:boolean) => (v === true)).length;
            //console.log(maxtrafficlight)
            //console.log(maxtrafficlight,scheduledcards.revisioncards.length + maxtrafficlight)
            if (scheduledcards.revisioncards.length + maxtrafficlight <= 5){
                if (maxtrafficlight <= 5 ){
                    setShowPickedTrafficLightind(data)
                    const revisioncards = revisioncarddata.revisioncarddata.revisioncards.map((items:Object,ind:any) => {return(Object.assign({},items,{"color":data[ind].color}))}).filter((items:any) => (items.color !== "none"))
                    var json = {"sendtoemail":revisioncarddata.revisioncarddata.sendtoemail,"revisionscheduleinterval":revisioncarddata.revisioncarddata.revisionscheduleinterval,"revisioncards":revisioncards}
                    //console.log(json)
                    const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/schedulerevisioncard`,json,config)
                    const responseaccount:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getrevisioncards`,config)
                    var newrevisioncarddata = responseaccount.data
                    //console.log(responseaccount)
                    
                    //console.log(config)
                    setRevisionCarddata((previousState:any) => {
                        //revisioncarddata.revisioncards.reverse()
                        //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
                        return { ...previousState, newrevisioncarddata}
                        
                    });
                    //window.location.reload()

                    ;
                }
            }
            else {
                reactalert.show("Maximum 5 scheduled cards.")
            }
        
        }
        // When there is a color already selected
        if (revisioncardcolor !== false && (color !== "none" && color !== revisioncardcolor)){
            revisioncard["color"] = revisioncardcolor
            const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/unschedulerevisioncard`,revisioncard,config)
            revisioncard["color"] = color
            data[index]["color"] = color;
            data[index]["showpickedtrafficlightind"] = index;
            data[index]["pickedtrafficlightind"] = true;
            //console.log(data)
            const maxtrafficlight = showpickedtrafficlightind.map((items:any) => {if (items.color !== "none") {return(true)} else {return(false)}}).filter((v:boolean) => (v === true)).length;
            //console.log(maxtrafficlight,scheduledcards.revisioncards)
            if (scheduledcards.revisioncards.length + maxtrafficlight <= 5){
                    if (maxtrafficlight <= 5 ){
                    setShowPickedTrafficLightind(data)
                    const revisioncards = revisioncarddata.revisioncarddata.revisioncards.map((items:Object,ind:any) => {return(Object.assign({},items,{"color":data[ind].color}))}).filter((items:any) => (items.color !== "none"))
                    var json = {"sendtoemail":revisioncarddata.revisioncarddata.sendtoemail,"revisionscheduleinterval":revisioncarddata.revisioncarddata.revisionscheduleinterval,"revisioncards":revisioncards}
                    //console.log(json)
                    const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/schedulerevisioncard`,json,config)
                    const responseaccount:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getrevisioncards`,config)
                    var newrevisioncarddata = responseaccount.data
                    //console.log(responseaccount)
                    
                    //console.log(config)
                    setRevisionCarddata((previousState:any) => {
                        //revisioncarddata.revisioncards.reverse()
                        //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
                        return { ...previousState, newrevisioncarddata}
                        
                    });
                    window.location.reload()

                    ;
                }
            }
            else{
                reactalert.show("Maximum 5 scheduled cards.")
            }

        }
        if (color === revisioncardcolor){
            const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/unschedulerevisioncard`,revisioncard,config)
            window.location.reload()

        }
        window.localStorage.setItem("manualstay","true")
    }
    const getrevisioncards = async (token:string) => {
        //console.log(token)
        revisioncardswebsocket.insert = function ( index:number, ...items:any ) {
            this.splice( index, 0, ...items );
        };
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        //const response:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getrevisioncards`,config)
        const responseaccount:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getaccountinfo`,config)
        const ws = new WebSocket(`wss://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getrevisioncardsws/${token}`);


        ws.onopen = (event) => {
            ws.send(JSON.stringify(config));
        };

        ws.onmessage = function (event) {
            try {
                const response = JSON.parse(event.data);
                //var revisioncardslarge = {"revisioncards":[response]}
                const respobj = JSON.parse(response)
                //console.log(respobj)
                
                revisioncardswebsocket.push(respobj)

                var revisioncarddata:any = {"revisioncards":revisioncardswebsocket,"revisionscheduleinterval": respobj["revisionscheduleinterval"],"sendtoemail":respobj["sendtoemail"]}

        
        if (responseaccount.data.subscription === "educational" || responseaccount.data.subscription === "premium" || responseaccount.data.subscription === "student educational" ){
            setAllowTrafficLights(true)
            setAllowedMaximumScheduledCards(5)
        }
        setEmail(responseaccount.data.email)
        //setStudentAccountInfo(response.data.result)
        ////console.log(response.data)
        

        const trafficlightinit = Array.from({length:revisioncarddata.revisioncards.length}, (_,i) => {return({color:"none",showpickedtrafficlightind:-1,pickedtrafficlightind:false})})
        //console.log(trafficlightinit)
        setShowPickedTrafficLightind(trafficlightinit)
        
        if (!(Object.keys(respobj).includes("message"))){
            //console.log(response.data)
            setRevisionCarddata((previousState:any) => {
                //revisioncarddata.revisioncards.reverse()

                //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
                return { ...previousState, revisioncarddata}
                
              });
            
        }
        else{
            if (respobj["message"] === "all sent."){
                console.log(respobj["message"])

                ws.close()
            }

        }
    } catch (err) {
        console.log(err);
        }
    };

    }
    // TODO : Each Button reqiures an api to do the following
    // TODO Allow change if Interval
    const schedulerevisioncard = async (index:any,revisioncard:any,token:string) => {
        //console.log(token)
        //console.log(revisioncard.revisionscheduleinterval)
        var json = {"sendtoemail":revisioncarddata.revisioncarddata.sendtoemail,"revisionscheduleinterval":revisioncard.revisionscheduleinterval,"revisioncards":[revisioncard]}
        //console.log(json)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/schedulerevisioncard`,json,config)
        await checkschedulerevisioncard(token)
        //window.location.reload();
        //setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:true}))
          
        
    }
    const unscheduleallrevisioncard = async (token:string) => {
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.delete(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/unscheduleallrevisioncard`,config)

        window.location.reload()
        //console.log(response.data)
    }
    const automaticschedulingcheck = async (token:string) => {
        setManualScheduling(true);
        window.location.reload()
        //const config = {headers: {Authorization: `Bearer ${token}`,}}
        //const response:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/checkschedulerevisioncard`,config)
        //console.log(response.data)
        //setScheduledCardState(response.data)
    }
    const unschedulerevisioncard = async (index:any,revisioncard:any,token:string) => {
        //console.log(token)
        //console.log(revisioncard)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        //console.log(revisioncard,"gy")
        const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/unschedulerevisioncard`,revisioncard,config)
        setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:false}))
        //window.location.reload()
        await checkschedulerevisioncard(token)

        /*setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            return {previousState}
            
          });*/
    }
    const checkschedulerevisioncard = async (token:string) => {
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/checkschedulerevisioncard`,config)
        //console.log(response.data)
        setScheduledCardState(response.data)
        ////console.log(response.data)
    }
    const changerevisioncard = async (revisioncardind:number,prevrevisioncard:any,newrevisioncard:any,token:string) => {
        //if (n)
        if (newrevisioncard === ""){
            setCardNotChanged((items:any)=> ({...cardnotchanged,cardnotchangedind:revisioncardind,cardnotchanged:true}))
        }
        else if(newrevisioncard !== ""){
            const newrevisioncardjson = {"revisioncard":prevrevisioncard.revisioncard,"newrevisioncard": newrevisioncard.newrevisoncard,"revisioncardtitle": prevrevisioncard.revisioncardtitle,"subject": prevrevisioncard.subject,"revisionscheduleinterval":prevrevisioncard.revisionscheduleinterval}
            //console.log(newrevisioncardjson)
            const config = {headers: {Authorization: `Bearer ${token}`,}}
            //console.log(newrevisioncardjson)
            const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/changerevisioncard`,newrevisioncardjson,config)

            setRevisionCarddata((previousState:any) => {
                //revisioncarddata.revisioncards.reverse()
                //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
                previousState["revisioncarddata"]["revisioncards"][revisioncardind]["revisioncard"] = newrevisioncard.newrevisoncard
                return { ...previousState, previousState}
                
              });
            setNewRevisionCard("")
            //window.location.reload()
        }
          
    }
    const changesendtoemail = async (e:any) => {
        //if (n)
        e.preventDefault();
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        var json = {"sendtoemail":newsendtoemail}
        //console.log(json)
        const response:any = await axios.put(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/changesendtoemail`,json,config)
        setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            //console.log(previousState)
            
            previousState["revisioncarddata"]["sendtoemail"] = newsendtoemail
            return { ...previousState, previousState }
            
          });
          setNewSendToEmail("")
          setChangeEmail(false)
        

    }
          
    const sendnowrevisioncard = async (revisioncard:any,token:string) => {        
        var json = {"sendtoemail":revisioncarddata.revisioncarddata.sendtoemail,"revisionscheduleinterval":revisioncarddata.revisioncarddata.revisionscheduleinterval,"revisioncards":[revisioncard]}
        //console.log(json)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/sendnowrevisioncard`,json,config)
        ////console.log(response.data)

    }
    const sharerevisioncard = async (revisioncard:any) => {
        //console.log(revisioncard)
        revisioncard["email"] = email
        const responseshare:any = await axios.post("https://revisionbankcardlink-aoz2m6et2a-uc.a.run.app/hashnotecard",revisioncard)
        const revisioncardurl = `https://revisionbankcardlink-aoz2m6et2a-uc.a.run.app/notecard?h=${responseshare.data.message}&u=${email}`
        //reactalert.show(revisioncardurl)
        //console.log(revisioncardurl)
        setShareURL(revisioncardurl)
        setShareShow(true)


    }
    const showintervaldatetime = (interval:any) => {
            if (typeof(interval) === "string"){
                if (interval.includes("MI")) {
                    return "Minutes"
                }
                else if (interval.includes("H")){
                    return "Hours"
                }
                else if (interval.includes("D") ){
                    return "Days"
                }
                else if (interval.includes("MO") ){
                    return "Months"
                }
            }
            else{
                return "Minutes"
            }
    }
    const removerevisioncard = async (revisioncard:any,token:string) => {
        var answer = window.confirm("Remove revisioncard!");
        if (answer) {
        //console.log(token)
        //console.log(revisioncard)
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        //var json = {"removerevisioncard":revisioncard}
        revisioncard["sendtoemail"] = sendtoemail
        const response:any = await axios.post(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/removerevisioncard`,revisioncard,config)
        //console.log(response.data)
        const responseaccount:any = await axios.get(`https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getrevisioncards`,config)
        var newrevisioncarddata = responseaccount.data
        //console.log(responseaccount)
        
        //console.log(config)
        /*setRevisionCarddata((previousState:any) => {
            //revisioncarddata.revisioncards.reverse()
            //revisioncarddata.revisioncards.unshift(revisioncarddata.revisioncards.splice(-1)[0]) 
            return { ...previousState, newrevisioncarddata}
            
          });*/
        window.location.reload()
        }
        else {
            //some code
        }

        
    }
    const checkrevisecard = (revisioncard:any,scheduledcards:any) => {
        if (scheduledcards.revisioncards !== undefined){
            if (scheduledcards.revisioncards.length > 0){
                
                for (var i = 0; i < scheduledcards.revisioncards.length; i++){
                    if(scheduledcards.revisioncards[i].revisioncard === revisioncard.revisioncard){
                        if ("color" in scheduledcards.revisioncards[i]){
                            revisioncard["color"] = scheduledcards.revisioncards[i].color
                            return [true,revisioncard]
                            
                        }
                        else if (!("color" in scheduledcards.revisioncards[i])){
                            return [true,revisioncard]
                        }
                        //return true
                        //.findIndex(checkAge);
                        //console.log(revisioncard)
                        
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
        //unscheduleallrevisioncard(token)
        const manualpagecookie:any = window.localStorage.getItem("manualstay")
        if (manualpagecookie !== null){
            setManualScheduling(false)
        }
      },[]);
    useEffect(() => {
        //Runs only on the first render
        getrevisioncards(token)
        checkschedulerevisioncard(token)
      },[]); //scheduled




      //console.log(email)
      var revisionscheduleinterval = (revisioncarddata !== "") ? revisioncarddata.revisioncarddata.revisionscheduleinterval : "No Revision Cards"
      //console.log(revisioncarddata.revisioncarddata)
      var sendtoemail = (revisioncarddata !== "") ? revisioncarddata.revisioncarddata.sendtoemail : "No Revision  Cards"
      var revisioncards = (revisioncarddata !== "") ? revisioncarddata.revisioncarddata.revisioncards : []
      var scheduledcards = (scheduledcardstate !== "") ? scheduledcardstate : []
      //console.log(scheduledcards)
      //console.log(revisioncarddata)
    //console.log(scheduled)
    //console.log(scheduledcardstate)
    //console.log(showpickedtrafficlightind)
    //console.log(email)
    return(
        <div>
            
            {statebool ?
            <div>
            {props.splitscreen == true ? null: <HeaderRevision token={token}/> }
            {/*email === "amari.lawal05@gmail.com" && 
            <div style={{position:"absolute",top:maxRowBased ? "20px":"330px",left:maxRowBased ? "30px" : "197px",width:"250px",zIndex:1 ,color:maxRowBased ? "white" : "black"}}>
            <p>
                Amari Hussey Lawal Affirmation: The more you give, the more you have. The more you take the less you have. God has given me everything and giving to God is a never-ending beauty. Give friendship, love comradery and more.
            </p>
            </div>*/ }
           
            

            <div style={{display:props.splitscreen ? "relative":"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:props.splitscreen ? "0px":"50px"}}>
            
            
                {props.splitscreen == true ? null: 
                <div>
                <h1 style={{color:"white",marginBottom:"20px"}}>Revision Cards</h1>
                
                </div>
                }
                { shareshow === true &&
                <ShareAlert setShareURL={setShareURL} shareshow={shareshow} shareurl={shareurl} setShareShow={setShareShow} maxRowBased={maxRowBased}></ShareAlert>
                    }
                <div style={{position:"relative",border:"3px white solid",borderRadius: props.splitscreen ? "0px":"10px",backgroundColor:"white",width: maxRowBased ? props.splitscreen ? "70vh":"100vh" : "60vh"}}>
                    {allowtrafficlights &&
                    <div style={{display:"flex",justifyContent:"end"}}>
                        {/**;unscheduleallrevisioncard(token) */}
                        <Button style={{margin:"10px",fontSize:"13px",width:"100px",backgroundColor:"#dc3545",border:"1px solid #dc3545"}} onClick={(e:any) => {unscheduleallrevisioncard(token)}}>Unschedule All</Button>
                        <Button style={{margin:"10px",fontSize:"13px",backgroundColor:"purple",border:"1px solid purple"}} onClick={(e:any) => {if (manualscheduling === true){setManualScheduling(false)} else if (manualscheduling === false){automaticschedulingcheck(token);window.localStorage.removeItem("manualstay")}}}>{manualscheduling === true ? "Manual Scheduling" :"Automatic Scheduling" }</Button>
                    </div>
                        }
                    {/*This is for all to unschedule */}
                   <div style={{display:"flex",justifyContent:"end"}}>
                        {/**;unscheduleallrevisioncard(token) */}
                        <Button style={{margin:"10px",fontSize:"13px",width:"100px",backgroundColor:"#dc3545",border:"1px solid #dc3545"}} onClick={(e:any) => {unscheduleallrevisioncard(token)}}>Unschedule All</Button>
                    </div>
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
                            {revisioncards.length > 0  && !revisioncards.includes(undefined) && revisioncards.map((revisioncard:any,index:any) => {
                                var weirdboole:any = checkrevisecard(revisioncard,scheduledcards)
                                //console.log(weirdboole)
                                const revboole = weirdboole !== undefined ? weirdboole[0] : [] 
                                const revisioncardcolor =  weirdboole !== undefined && weirdboole[1] !== undefined && "color" in weirdboole[1]  && weirdboole[1].color   
                                //console.log(revisioncardcolor)
                                //console.log(revisioncard.revisioncardimage)
                                //console.log(newrevisioncard.newrevisoncard)
                                const cards_exist = !("message" in revisioncard) ? true : false
                                if (cards_exist === true){
                                return(
                                <div>
                                    <ManageRevisionCardsInfo key={index} index={index} maxRowBased={maxRowBased} revisioncard={revisioncard} showintervaldatetime={showintervaldatetime} setNewRevisionCard={setNewRevisionCard} token={token}/>

                                    
                                        
                                    
                                    <div style={{display:"flex",marginTop:"10px",flexDirection:maxRowBased ? "row":"row",justifyContent: "space-between"}}>
                                  
                                    {newrevisioncard.revisioncardind === index && newrevisioncard.newrevisoncard  !== "" && 

                                    <Button onTouchStart={() => {changerevisioncard(index,revisioncard,newrevisioncard,token)}} onClick={() => {changerevisioncard(index,revisioncard,newrevisioncard,token)}} style={{backgroundColor:"#00008B",width:"100px",border:"1px solid #00008B",height:"30px",fontSize:"13px"}}>Submit</Button>}
                                    <Button onClick={() => {removerevisioncard(revisioncard,token)}} style={{backgroundColor:"#dc3545",width:"100px",border:"1px solid #dc3545",height:"30px",fontSize:"13px",marginRight:maxRowBased ?"17px":"10px"}}>Remove</Button>
                                    <Button onTouchStart={() => {sharerevisioncard(revisioncard)}} onClick={() => {sharerevisioncard(revisioncard)}} style={{backgroundColor:"#fa0095",width:"100px",border:"1px solid #fa0095",height:"30px",fontSize:"13px",marginRight:maxRowBased ?"17px":"10px",marginTop:maxRowBased ? "auto" : "5px" }}>Share</Button>
                                    {/*<ShareAlert shareshow={shareshow} sharerevisioncard={sharerevisioncard} revisioncard={revisioncard} maxRowBased={maxRowBased}></ShareAlert>*/}
                                    
                                    </div>
                                    {/*|| scheduledcards.revisioncards.includes(revisioncard) */ }
                                    
                                    {manualscheduling === true ?
                                    (scheduled.revisioncardind === index && scheduled.scheduled === true )|| revboole === true ? //

                                    <Button onClick={() => {unschedulerevisioncard(index,revisioncard,token);setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:false}))}} style={{backgroundColor:"#fa0095",marginTop:"10px",width:"100px",border:"1px solid #fa0095",height:"30px",fontSize:"13px",marginRight:maxRowBased ?"17px":"10px"}}>Scheduled</Button>
                                    :
                                     
                                    scheduledcards.revisioncards !== undefined ? 
                                    scheduledcards.revisioncards.length < allowedmaximumscheduledcards ? /* 5  */
                                    <div>
                                    <Button onClick={() => {schedulerevisioncard(index,revisioncard,token);setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{backgroundColor:"grey",marginTop:"10px",width:"100px",border:"1px solid grey",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Unscheduled</Button>
                                    {/*Send now 1 duplicate need*/}
                                    { 
                                    sentnow.revisioncardind === index && sentnow.scheduled === true ?
                                    <Button onClick={() => {setSentNow((items:any)=> ({...index,revisioncardind:index,scheduled:false}))}} style={{marginTop:"10px",width:"100px",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Sent!</Button>
                                    :
                                    <Button onClick={() => {sendnowrevisioncard(revisioncard,token);setSentNow((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{marginTop:"10px",width:"100px",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Send Now!</Button>
                                    
                                    }
                                    </div>
                                    :
                                    <Button onClick={() => {reactalert.show(`Maximum ${allowedmaximumscheduledcards} scheduled cards.`)}} style={{backgroundColor:"grey",marginTop:"10px",width:"100px",border:"1px solid grey",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Unscheduled</Button>
                                    :
                                    <div>
                                    <Button onClick={() => {schedulerevisioncard(index,revisioncard,token);setScheduled((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{backgroundColor:"grey",marginTop:"10px",width:"100px",border:"1px solid grey",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Unscheduled</Button>
                                    {/*Send now 2 duplicate also needed*/}
                                    { 
                                    sentnow.revisioncardind === index && sentnow.scheduled === true ?
                                    <Button onClick={() => {setSentNow((items:any)=> ({...index,revisioncardind:index,scheduled:false}))}} style={{marginTop:"10px",width:"100px",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Sent!</Button>
                                    :
                                    <Button onClick={() => {sendnowrevisioncard(revisioncard,token);setSentNow((items:any)=> ({...index,revisioncardind:index,scheduled:true}))}} style={{marginTop:"10px",width:"100px",height:"30px",fontSize:"11px",marginRight:maxRowBased ?"17px":"10px"}}>Send Now!</Button>
                                    
                                    }
                                    </div>
                                :
                                <div style={{display:"flex",justifyContent:"end",marginRight:"50px",marginTop:newrevisioncard.revisioncardind === index && newrevisioncard.newrevisoncard  !== "" ? "0px":"-30px"}}  >
                                    {/*( ( foo && !bar ) || ( !foo && bar ) )  */}
                                    {/*showpickedtrafficlightind[index].color === "green"  && showpickedtrafficlightind[index].pickedtrafficlightind === true || (revisioncardcolor === "green") */}
                                <LensIcon style={{cursor:"pointer",fontSize:"40px",color:"green",border:((showpickedtrafficlightind[index].color === "green" && !(revisioncardcolor === "green"))|| (!(showpickedtrafficlightind[index].color === "green") && revisioncardcolor === "green")) ? "3px solid black" : "",borderRadius: "20px"}} onClick={() => {onTrafficLightColorClick("green",index,token,revisioncard,revisioncardcolor)}}></LensIcon>
                                <LensIcon style={{cursor:"pointer",fontSize:"40px",color:"#FFC600",border:((showpickedtrafficlightind[index].color === "amber" && !(revisioncardcolor === "amber"))|| (!(showpickedtrafficlightind[index].color === "amber") && revisioncardcolor === "amber")) ? "3px solid black" : "",borderRadius: "20px"}} onClick={() => {onTrafficLightColorClick("amber",index,token,revisioncard,revisioncardcolor)}}></LensIcon>
                                <LensIcon style={{cursor:"pointer",fontSize:"40px",color:"red",border:((showpickedtrafficlightind[index].color === "red" && !(revisioncardcolor === "red"))|| (!(showpickedtrafficlightind[index].color === "red") && revisioncardcolor === "red")) ? "3px solid black" : "",borderRadius: "20px"}} onClick={() => {onTrafficLightColorClick("red",index,token,revisioncard,revisioncardcolor)}}></LensIcon>
                                </div>
                                }
                                    {cardnotchanged.cardnotchangedind === index && cardnotchanged.cardnotchanged === true && <p>Card Not changed.</p>}
                                    
                                </div>
                                )}
                                
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