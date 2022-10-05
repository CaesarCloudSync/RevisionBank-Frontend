import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
export default function AccountInfo(props:any){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const isotodatetime = (datetimestring:any) => {
        if (datetimestring === "No Subscription"){
            return "No Subscription"
        }
        else{
            const datetimeres = new Date(datetimestring).toString()
            return datetimeres
        }

    }
    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:"50px"}}>
            <div>
            <h1 style={{color:"white",marginBottom:"20px"}}>Account Info</h1>
            </div>
            <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "60%" :"80%",height:maxRowBased ? props.accountinfo.numofaccounts ? "80vh" : "60vh"  : "110vh"}}>
                <div style={{position:"relative",left:"10%",top:"10%",width: "80%",border:"1px grey solid",borderRadius:"5px"}}>
                    <div style={{margin:"20px"}}>
                        <div style={{display:"flex",gap:"25%",borderBottom:"1px grey solid",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Email:</p>
                            <p >{props.accountinfo.email}</p>
                        </div>
                        <div style={{display:"flex",gap:"17%",borderBottom:"1px grey solid",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Subscription:</p>
                            <p>{props.accountinfo.subscription.replace(/^\w/, (c:string) => c.toUpperCase())}</p>
                        </div>
                        {props.accountinfo.numofaccounts !== undefined &&
                        <div style={{display:"flex",gap:"8%",borderBottom:"1px grey solid",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Number of accounts:</p>
                            <p>200</p>
                        </div>}
                        <div style={{display:"flex",gap:"18%",borderBottom:"1px grey solid",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Emails Left:</p>
                            <p>{props.accountinfo.emailsleft}</p>
                        </div>
                        <div style={{display:"flex",gap:"4%",borderBottom:"1px grey solid",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Subscription Start Date:</p>
                            <p>{isotodatetime(props.accountinfo.start_date_subscription)}</p>
                        </div>
                        <div style={{display:"flex",gap:"5.5%",marginTop:"50px",flexDirection:maxRowBased ? "row":"column"}}>
                            <p style={{color:"grey"}}>Subscription End Date:</p>
                            <p>{isotodatetime(props.accountinfo.end_date_subscription)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}