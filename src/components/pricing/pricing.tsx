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
import Policies from '../homepage/components/policies';
import { Helmet } from 'react-helmet';
export default function PricingPage(){
	const navigate = useNavigate();
	const location = useLocation();
	const statevalue:any = (location.state !== null) ? location.state : "nostate"
	const token = (statevalue !==  "nostate" && statevalue !== null) ? statevalue.token : "notoken"
	const tokenbool = (token === "notoken") ? true :  false 
	const buttondisplay = (tokenbool !== true) ? "Buy Now" : "Signup"
	const buttondisplaybasic = (tokenbool !== true) ? "Use Now" : "Signup"
	const buttondisplaybasicsignin = (tokenbool !== true) ? "Use Now" : "Signin"
	const buttondisplaysignin = (tokenbool !== true) ? "Buy Now" : "Signin"
	const prices:any = {"basic": 0.00,"standard": 1.99,"premium": 2.99,"educational":360,"educationalthreemonths":999.95,"educationalsixmonths":1895.99,"educationalyear":3695.95}
	const educationalaccounts = 200
	const email = (statevalue !==  "nostate" && statevalue !== null) ? statevalue.email : "noemail"
	var pre_subscription_state = (statevalue !==  "nostate" && statevalue !== null) ? true : false // signin -> pricing
	const [subscription_state, setSubscriptionState] = useState(pre_subscription_state)// signin -> pricing
	const [arrowClicked,setArrowClicked] = useState<any>({basic:false,standard:false,premium:false,educational:false})
	const [HideEducational,setHideEducational] = useState(false)
	const leftshift = "-200px"
	const showWord = true
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
		else if (buttondisplay === "Buy Now" && price !== 0){
			navigate('/payment',{state:{"subscription":subscription,"token":token,"price":price,"email":email}});
		}
		else if (price === 0){
			navigate('/revisionbank',{state:{token:token,email:email}});
		}
	}
	const maxRowBased = useMediaQuery(maxRowBasedquery)
	function PricingDetails(props:any){
		if (props.numemails === 0){
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
		else { 
			return(
			<div style={{position:"relative"}}>
			<ul style={{display:"flex",flexDirection:"column"}}>
				<li><em>{props.numsubj}</em> A Level Subjects</li>
				<li><em>{props.numemails} </em>{props.emailoption}</li>
				<li><em>Unlimited Range </em> of Question Papers & Mark Schemes</li>
				<li><em>Unlimited Revision cards</em> RevisionBank Scheduler </li>
				<li><em>RevisionBank Traffic Light </em> Card Scheduler</li>
			</ul>
		</div>

		)

	}
}
	function PricingDetailsEducational(props:any){
		return(				
		<div style={{position:"relative"}}>
		<ul style={{display:"flex",flexDirection:"column"}}>
			<li><em>{props.accounts}</em> accounts</li>
			<li><em>Unlimited</em> emails/month</li>
			<li><em>Unlimited Revision cards</em> RevisionBank Scheduler </li>
			<li><em>Unlimited Range </em> of Question Papers and Markschemes</li>
			<li><em>RevisionBank Traffic Light </em> Card Scheduler</li>
		</ul>
	</div> )

	}
	function PricingDetailsEducationalSubscription(props:any){
		return(
		<li style={{position:"relative",left:maxRowBased ? leftshift : "auto"}} className="cd-popular">
		<header className="cd-pricing-header">
			<h2>Educational Institute Subscription</h2>

			<div className="cd-price">
				<span className="cd-currency">£</span>
				<span className="cd-value">{props.subscriptiontrial}</span>
				<span style={{fontSize:"10px"}} className="cd-duration">{props.timeperiod === 12 ? showWord !== true && 1 : props.timeperiod} {props.timeperiod == 12 ? "yr": "months" }</span>
			</div>
		</header> 

		<div className="cd-pricing-body">
			<ul className="cd-pricing-features">
				<li><em>{educationalaccounts}</em> accounts</li>
				<li><em>Unlimited</em> emails/month</li>
				<li><em>Unlimited Revision cards</em> RevisionBank Scheduler </li>
				<li><em>Unlimited Range </em> of Question Papers and Markschemes</li>
				<li><em>RevisionBank Traffic Light </em> Card Scheduler</li>
			</ul>
		</div> 

		<footer className="cd-pricing-footer">
			<div style={styles.signinphonecont}>
				<a style={styles.signinphonetextcolor}className="cd-select" onClick={() => navSignup("signup","educational",token,buttondisplay,props.subscriptiontrial)}>{buttondisplay}</a>
				<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","educational",token,buttondisplaysignin,props.subscriptiontrial)}>{buttondisplaysignin}</a>
				{(maxRowBased || arrowClicked.educational) ? "":<a onClick={() => setArrowClicked({...arrowClicked,educational:true}) }><img src={arrowSVG}></img></a>}
				{(maxRowBased || !arrowClicked.educational) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,educational:false})}></CloseIcon>}
			</div>
		</footer> 
		{ (maxRowBased || !arrowClicked.educational) ? "":<PricingDetailsEducational numsubj={"Unlimited Range"} accounts={educationalaccounts}/>}
	</li>)

	}
	const styles = {
		signinphonecont:{display:maxRowBased ? "inline":"flex",justifyContent: maxRowBased ? "auto":"center",marginTop: maxRowBased ? "auto":"10%", gap:maxRowBased ? "auto":"10px"},
		signinphonetextcolor:{color:maxRowBased ? "auto" :"black"},
		signinphonebackgroundcolor: {backgroundColor:maxRowBased ? "gold": "none"}
	}
	// TODO What's causing the horizontal scrollbar is the position:absolute for the footer.
	return(
    <div>
	<Helmet>
	<title>RevisionBank Pricing</title>
        <meta
          name="description"
          content="£1.99 per month for question papers,exam papers, mark schemes for AS level and A Level subjects. With an unlimited amount of revision cards scheduled every 30 minutes."
        />
        <meta
          name="keywords"
          content="RevisionBank Pricing, Revision Bank Pricing, RevisionBank Prices,RevisionBank Price,Revision Bank Prices,Revision Bank Price"
        />
	</Helmet>

	<HeaderComponent/>
	<div className="cd-pricing-container cd-has-margins">
	<header className="cd-header">
		<h1>Subscriptions</h1>
	</header>
	{subscription_state && <Popup handleClose={togglePopup} />}

		<ul style={{position:maxRowBased ? "relative":"relative",right:maxRowBased ? "auto" :"5%",left:maxRowBased ? !HideEducational ? "15%":"0%" : "auto"}} className="cd-pricing-list">{/*TODO- show educational account config = left:maxRowBased ? "0%" : "auto"*/}
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
						<li><em>0</em> emails/month</li>
						<li><em>Unlimited Range </em> of A Level Subjects</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number </em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
					<a style={styles.signinphonetextcolor} className="cd-select" onClick={() => navSignup("signup","basic",token,buttondisplay,prices.basic)}>{buttondisplaybasic}</a>
					<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","basic",token,buttondisplaysignin,prices.basic)}>{buttondisplaybasicsignin}</a>
					{(maxRowBased || arrowClicked.basic) ? "":<a onClick={() => setArrowClicked({...arrowClicked,basic:true}) }><img src={arrowSVG}></img></a>}
					{(maxRowBased || !arrowClicked.basic) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,basic:false})}></CloseIcon>}
					</div>
				</footer> 
				{ (maxRowBased || !arrowClicked.basic) ? "":<PricingDetails numsubj={"Unlimited Range"} numemails={0} emailoption={"emails/month"}/>}
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
						<li><em>40</em> emails/month</li>
						<li><em>Unlimited Range </em> of A Level Subjects</li>
						<li><em>Unlimited Range </em> of Question Papers & Mark Schemes</li>
						<li><em>Unlimited Revision cards</em> RevisionBank Scheduler </li>
						<li><em>Unlimited Number </em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
						<a style={styles.signinphonetextcolor}className="cd-select" onClick={() => navSignup("signup","standard",token,buttondisplay,prices.standard)}>{buttondisplay}</a>
						<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","standard",token,buttondisplaysignin,prices.standard)}>{buttondisplaysignin}</a>
						{(maxRowBased || arrowClicked.standard) ? "":<a onClick={() => setArrowClicked({...arrowClicked,standard:true}) }><img src={arrowSVG}></img></a>}
						{(maxRowBased || !arrowClicked.standard) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,standard:false})}></CloseIcon>}
					</div>
				</footer> 
				{ (maxRowBased || !arrowClicked.standard) ? "":<PricingDetails numsubj={"Unlimited Range"} numemails={40} emailoption={"emails/month"}/>}
			</li>
			
			<li >
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
						<li><em>Unlimited</em> emails</li>
						<li><em>Unlimited Range </em> of A Level Subjects</li>
						<li><em>Unlimited Revision cards</em> RevisionBank Scheduler </li>
						<li><em>Unlimited Range </em> of Question Papers & Mark Schemes</li>
						
						<li><em>RevisionBank Traffic Light </em> Card Scheduler</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
						<a style={styles.signinphonetextcolor} className="cd-select" onClick={() => navSignup("signup","premium",token,buttondisplay,prices.premium)}>{buttondisplay}</a>
						<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","premium",token,buttondisplaysignin,prices.premium)}>{buttondisplaysignin}</a>
						{(maxRowBased || arrowClicked.premium) ? "":<a onClick={() => setArrowClicked({...arrowClicked,premium:true}) }><img src={arrowSVG}></img></a>}
						{(maxRowBased || !arrowClicked.premium) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,premium:false})}></CloseIcon>}
					</div>	
				</footer> 
				{ (maxRowBased || !arrowClicked.premium) ? "":<PricingDetails numsubj={"Unlimited Range"} numemails={"Unlimited"} emailoption={"emails/month"}/>}  
			</li>
			{ !HideEducational &&
			<li className="cd-popular">
				<header className="cd-pricing-header">
					<h2>Educational Institute</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">{prices.educational}</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>{educationalaccounts}</em> accounts</li>
						<li><em>Unlimited</em> emails/month</li>
						<li><em>Unlimited Revision cards</em> RevisionBank Scheduler </li>
						<li><em>Unlimited Range </em> of Question Papers and Markschemes</li>
						<li><em>RevisionBank Traffic Light </em> Card Scheduler</li>
						
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<div style={styles.signinphonecont}>
						<a style={styles.signinphonetextcolor}className="cd-select" onClick={() => navSignup("signup","educational",token,buttondisplay,prices.educational)}>{buttondisplay}</a>
						<a style={Object.assign({},styles.signinphonebackgroundcolor,styles.signinphonetextcolor)} className="cd-selectsignin" onClick={() => navSignup("signin","educational",token,buttondisplaysignin,prices.educational)}>{buttondisplaysignin}</a>
						{(maxRowBased || arrowClicked.educational) ? "":<a onClick={() => setArrowClicked({...arrowClicked,educational:true}) }><img src={arrowSVG}></img></a>}
						{(maxRowBased || !arrowClicked.educational) ? "":<CloseIcon sx={{ fontSize: 30 }} style={{color:"white"}} onClick={() => setArrowClicked({...arrowClicked,educational:false})}></CloseIcon>}
					</div>
				</footer> 
				{/* (maxRowBased || !arrowClicked.educational) ? "":<PricingDetailsEducational numsubj={"Unlimited Range"} accounts={educationalaccounts}/>*/}
			</li>
			}
			{/* !HideEducational &&
			<PricingDetailsEducationalSubscription subscriptiontrial = {prices.educationalthreemonths} timeperiod={3}/>*/
			}
			{ /*!HideEducational &&
			<PricingDetailsEducationalSubscription subscriptiontrial = {prices.educationalsixmonths} timeperiod={6}/>*/
			}
			{ /* !HideEducational &&
			<PricingDetailsEducationalSubscription subscriptiontrial = {prices.educationalyear} timeperiod={12}/>*/
			}
		</ul> 
	</div> 	
	<Policies marginTop="-90px" marginTopPh="40px"></Policies>
    </div>

    )
}
/*
<script src="js/jquery-2.1.1.js"></script>
<script src="js/main.js"></script> </div>*/ 

