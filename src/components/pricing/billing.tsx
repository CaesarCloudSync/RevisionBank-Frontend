import ReactPayPal from "./paypal"
import { Navigate } from "react-router";
import { useLocation,useNavigate } from 'react-router';
export default function Billing(){
    const location:any = useLocation() //.state
    const statevalue:any = location.state
    const statebool = (statevalue === null) ? false : true // false if token doesnot exist
    const token = (statevalue !== null) ? statevalue.token : "" 
    const subscription = (statevalue !== null) ? statevalue.subscription : "" 
    const price = (statevalue !== null) ? statevalue.price : "" 
    const email = (statevalue !== null) ? statevalue.email : "" 
    //console.log(statevalue)
    class BillingStyles{
        container:Object;
        textcolor:Object;
        marginbot:Object;
        containerposition:Object;
        constructor(){
            this.marginbot = {marginBottom:"10px"}
            this.textcolor = {color:"white"}
            this.container = {display:"flex",justifyContent: "center",marginTop:"10%",textAlign:"left",alignItems:"center",gap:"30px",flexDirection:"column",width:"100%"}
            this.containerposition = {position:"relative",top:"50%"}
        }
    }
    const styles = new BillingStyles();
    

    return(
        <div> 
        { statebool ? 
        <div>
            <div style={styles.containerposition}>
                <div style={styles.container}>
                    <div>
                        <h2 style={styles.textcolor}>Start Studying Now</h2> 
                    </div>
                    <div style={{textAlign:"left"}}>
                        <h2 style={styles.textcolor}>Unlimited Question Papers and Markschemes £{price}/month</h2> 
                    </div>

                    <ReactPayPal price={price} token ={token} subscription={subscription} email={email}/>
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