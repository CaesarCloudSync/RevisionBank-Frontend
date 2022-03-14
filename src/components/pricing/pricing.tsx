import './css/style.css';
import HeaderComponent from '../headers/headerhome';
import { useNavigate,useLocation } from 'react-router-dom';
export default function PricingPage(){
	const navigate = useNavigate();
	const location = useLocation();
	const statevalue:any = (location.state !== null) ? location.state : "nostate"
	const token = (statevalue !==  "nostate" && statevalue !== null) ? statevalue.token : "notoken"
	const tokenbool = (token === "notoken") ? true :  false 
	const buttondisplay = (tokenbool !== true) ? "Buy Now" : "Signup"
	//console.log(tokenbool)
	//console.log(token)

	const navSignup = (subscription:any,token:any,buttondisplay:string,price:any) => {
		if (buttondisplay == "Signup"){
			navigate('/signup',{state:{"subscription":subscription}});
		}
		else if (buttondisplay == "Buy Now"){
			navigate('/payment',{state:{"subscription":subscription,"token":token,"price":price}});
		}
	}
	return(
    <div>

	<HeaderComponent/>
	<div className="cd-pricing-container cd-has-margins">
	<header className="cd-header">
		<h1>Subscriptions</h1>
	</header>

		<ul className="cd-pricing-list">
			<li>
				<header className="cd-pricing-header">
					<h2>Basic</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">2.99</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>3</em> A Level Subjects</li>
						<li><em>0</em> Emails</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number </em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<a className="cd-select" onClick={() => navSignup("basic",token,buttondisplay,2.99)}>{buttondisplay}</a>
				</footer> 
			</li>
			<li className="cd-popular">
				<header className="cd-pricing-header">
					<h2>Standard</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">4.99</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>4</em> A Level Subjects</li>
						<li><em>8</em> emails/month</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number </em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<a className="cd-select" onClick={() => navSignup("standard",token,buttondisplay,4.99)}>{buttondisplay}</a>
				</footer> 
			</li>
			<li>
				<header className="cd-pricing-header">
					<h2>Premium</h2>

					<div className="cd-price">
						<span className="cd-currency">£</span>
						<span className="cd-value">6.99</span>
						<span className="cd-duration">mo</span>
					</div>
				</header> 

				<div className="cd-pricing-body">
					<ul className="cd-pricing-features">
						<li><em>6</em> A Level Subjects</li>
						<li><em>Unlimited</em> Emails</li>
						<li><em>Unlimited Range </em> of Question Papers</li>
						<li><em>Unlimited Range </em> of Markschemes</li>
						<li><em>Unlimited Number</em> of Exam Boards</li>
					</ul>
				</div> 

				<footer className="cd-pricing-footer">
					<a className="cd-select" onClick={() => navSignup("premium",token,buttondisplay,6.99)}>{buttondisplay}</a>
				</footer>  
			</li>
		</ul> 
	</div> 	
    </div>

    )
}
/*
<script src="js/jquery-2.1.1.js"></script>
<script src="js/main.js"></script> </div>*/ 

