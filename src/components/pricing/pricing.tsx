import './css/style.css';
import HeaderComponent from '../headers/headerhome';
import { useNavigate,useLocation } from 'react-router-dom';
import { useState} from 'react';
import Popup from './popupicon';
import arrowSVG from "./img/cd-icon-small-arrow.svg" 
import { maxRowBasedquery } from '../mediahooks/mediamax';
import useMediaQuery from '../mediahooks/useMedia';
import CloseIcon from '@mui/icons-material/Close';
import { relative } from 'path';
export default function PricingPage(){
	const navigate = useNavigate();
	const location = useLocation();
	const statevalue:any = (location.state !== null) ? location.state : "nostate"
	const token = (statevalue !==  "nostate" && statevalue !== null) ? statevalue.token : "notoken"
	const tokenbool = (token === "notoken") ? true :  false 
	const buttondisplay = (tokenbool !== true) ? "Buy Now" : "Signup"
	const buttondisplaysignin = (tokenbool !== true) ? "Buy Now" : "Signin"
	const prices = {"basic": 2.99,"standard": 3.99,"premium": 6.99}
	const email = (statevalue !==  "nostate" && statevalue !== null) ? statevalue.email : "noemail"
	var pre_subscription_state = (statevalue !==  "nostate" && statevalue !== null) ? true : false // signin -> pricing
	const [subscription_state, setSubscriptionState] = useState(pre_subscription_state)// signin -> pricing
	const [arrowClicked,setArrowClicked] = useState<any>({basic:false,standard:false,premium:false})
	//console.log(tokenbool)
	//console.log(token)
	const [isOpen, setIsOpen] = useState(false);
 
	const togglePopup = () => {
	  setSubscriptionState(false)
	}
   

	const navSignup = (route:string,subscription:any,token:any,buttondisplay:string,price:any) => {
		if (buttondisplay === "Signup" || buttondisplay === "Signin"){
			navigate(`/${route}`,{state:{"subscription":subscription,"price":price}});
		}
		else if (buttondisplay === "Buy Now"){
			navigate('/payment',{state:{"subscription":subscription,"token":token,"price":price,"email":email}});
		}
	}
	const maxRowBased = useMediaQuery(maxRowBasedquery)
	function PricingDetails(props:any){
		return(				
		<div style={{position:"relative"}}>
		<ul style={{display:"flex",flexDirection:"column"}}>
			<li><em>{props.numsubj}</em> A Level Subjects</li>
			<li><em>{props.numemails} </em>{props.emailoption}</li>
			<li><em>Unlimited Range </em> of Question Papers</li>
			<li><em>Unlimited Range </em> of Markschemes</li>
			<li><em>Unlimited Number </em> of Exam Boards</li>
		</ul>
	</div> )

	}
	const styles = {
		signinphonecont:{display:maxRowBased ? "inline":"flex",justifyContent: maxRowBased ? "auto":"center",marginTop: maxRowBased ? "auto":"10%", gap:maxRowBased ? "auto":"10px"},
		signinphonetextcolor:{color:maxRowBased ? "auto" :"black"},
		signinphonebackgroundcolor: {backgroundColor:maxRowBased ? "gold": "none"}
	}
	// TODO What's causing the horizontal scrollbar is the position:absolute for the footer.
	return(
    <div>

	<HeaderComponent/>
	<div className="cd-pricing-container cd-has-margins">
	<header className="cd-header">
		<h1>Subscriptions</h1>
	</header>
	{subscription_state && <Popup handleClose={togglePopup} />}

		<ul style={{position:maxRowBased ? "relative":"relative",right:maxRowBased ? "auto" :"5%"}} className="cd-pricing-list">
			<li>
				<header className="cd-pricing-header">
				
					<h2>Basic</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">{prices.basic}</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>3</em> A Level Subjects</li>
						<li><em>25</em> emails/month</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number </em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
					<a style={styles.signinphonetextcolor} className="cd-select" onClick={() => navSignup("signup","basic",token,buttondisplay,2.99)}>{buttondisplay}</a>
					<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","basic",token,buttondisplaysignin,2.99)}>{buttondisplaysignin}</a>
					{(maxRowBased || arrowClicked.basic) ? "":<a onClick={() => setArrowClicked({...arrowClicked,basic:true}) }><img src={arrowSVG}></img></a>}
					{(maxRowBased || !arrowClicked.basic) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,basic:false})}></CloseIcon>}
					</div>
				</footer> 
				{ (maxRowBased || !arrowClicked.basic) ? "":<PricingDetails numsubj={3} numemails={25} emailoption={"emails/month"}/>}
			</li>
			<li className="cd-popular">
				<header className="cd-pricing-header">
					<h2>Standard</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">{prices.standard}</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>4</em> A Level Subjects</li>
						<li><em>40</em> emails/month</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number </em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
						<a style={styles.signinphonetextcolor}className="cd-select" onClick={() => navSignup("signup","standard",token,buttondisplay,4.99)}>{buttondisplay}</a>
						<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","standard",token,buttondisplaysignin,4.99)}>{buttondisplaysignin}</a>
						{(maxRowBased || arrowClicked.standard) ? "":<a onClick={() => setArrowClicked({...arrowClicked,standard:true}) }><img src={arrowSVG}></img></a>}
						{(maxRowBased || !arrowClicked.standard) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,standard:false})}></CloseIcon>}
					</div>
				</footer> 
				{ (maxRowBased || !arrowClicked.standard) ? "":<PricingDetails numsubj={4} numemails={40} emailoption={"emails/month"}/>}
			</li>
			<li>
				<header className="cd-pricing-header">
					<h2>Premium</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">{prices.premium}</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>6</em> A Level Subjects</li>
						<li><em>Unlimited</em> emails</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number</em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
						<a style={styles.signinphonetextcolor} className="cd-select" onClick={() => navSignup("signup","premium",token,buttondisplay,6.99)}>{buttondisplay}</a>
						<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","premium",token,buttondisplaysignin,6.99)}>{buttondisplaysignin}</a>
						{(maxRowBased || arrowClicked.premium) ? "":<a onClick={() => setArrowClicked({...arrowClicked,premium:true}) }><img src={arrowSVG}></img></a>}
						{(maxRowBased || !arrowClicked.premium) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,premium:false})}></CloseIcon>}
					</div>	
				</footer> 
				{ (maxRowBased || !arrowClicked.premium) ? "":<PricingDetails numsubj={6} numemails={"Unlimited"} emailoption={"emails/month"}/>}  
			</li>
		</ul> 
	</div> 	
    </div>

    )
}
/*
<script src="js/jquery-2.1.1.js"></script>
<script src="js/main.js"></script> </div>*/ 

