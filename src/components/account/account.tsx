import { useLocation,useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import HeaderScraper from "../headers/headerscraper"
import { useEffect, useState } from 'react';

import axios from 'axios';
import Policies from '../homepage/components/policies';
import AddStudentAccounts from './components/addstudentaccounts';
import AccountInfo from './components/accountinfo';
import DeleteButtons from './components/deletebuttons';
import ManageAccounts from './components/manageaccounts';
class AccountStyles{
    container:Object;
    constructor(maxRowBased:any){
        this.container = { display: "flex",justifyContent: "center",marginTop:"50px",flexDirection:"column",alignItems:"center",marginBottom:"20px"}
    }
}
export default function AccountPage(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new AccountStyles(maxRowBased)

    const location:any = useLocation() 
    
    
    const statevalue:any = location.state
    const statebool = (statevalue === null) ? false : true // false if token doesnot exist
    const token = (statevalue !== null) ? statevalue.token : "" 
    
    //console.log(statevalue)
    
    const [accountinfo,setAccountInfo] = useState<any>({_id: '', access: false, email: '', emailsleft: 0, end_date_subscription: '',password:'',start_date_subscription:'',subscription:'',numofaccounts:0})
    const [studentaccountinfo,setStudentAccountInfo] = useState<any>([]);

    const getaccountinfo = async (token:any) => {
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.get(`https://revisionbankbackend-aoz2m6et2a-uc.a.run.app/getaccountinfo`,config); // Send login post request.
        if ("subscription" in response.data){
            const emailsleft = (response.data.emailsleft > 40) ? "Unlimited" : response.data.emailsleft
            if (response.data.subscription === "educational"){
                getstudentsubscriptions(token)
            }
            setAccountInfo((accountinfo:any)=> ({...response.data,emailsleft:emailsleft}))
        }
        else if (!("subscription" in response.data)){
            setAccountInfo((accountinfo:any)=> ({...response.data,emailsleft:0,subscription:"No Subscription",start_date_subscription:"No Subscription",end_date_subscription:"No Subscription"}))
        }

    }
    
    const getstudentsubscriptions = async (token:any) => {
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.get(`https://revisionbankbackend-aoz2m6et2a-uc.a.run.app/getstudentsubscriptions`,config)
        setStudentAccountInfo(response.data.result)
        //console.log(response.data)
        
    }

    useEffect(() => {
        //Runs only on the first render
        getaccountinfo(token)
      }, []);
    



    
    //console.log(studentaccountinfo.length)
    return(
        <div>
            {statebool ? 
            <div>
            <HeaderScraper token={token}/>
            <div style={styles.container}>
            <AccountInfo accountinfo={accountinfo}/>
            {studentaccountinfo.length !== 0   && <ManageAccounts studentaccountinfo ={studentaccountinfo} accountinfo={accountinfo} token={token} setStudentAccountInfo={setStudentAccountInfo}></ManageAccounts>}
            {accountinfo.numofaccounts !== undefined && <AddStudentAccounts numstudentaccounts ={studentaccountinfo.length}accountinfo={accountinfo} token={token} setAccountInfo={setAccountInfo} setStudentAccountInfo={setStudentAccountInfo}/>}
            {accountinfo.subscription !== "student educational" && <DeleteButtons token={token}/>}
            <div style={{display:"flex"}}>
            <Policies margetop="80px"></Policies>
            </div>
                
                
            </div>

            </div>
            :
            <div>
                <Navigate to="/"/>
            </div>
            }
        </div>
        
    )
}