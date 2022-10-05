import { Card } from "react-bootstrap";
import {useState} from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import HeaderComponent from "../headers/headerhome";
import LoadingSpinner from "../../animations/Loadingspinner";
import { send } from 'emailjs-com';
import { maxRowBasedquery } from "../mediahooks/mediamax";
import useMediaQuery from "../mediahooks/useMedia";
import Policies from "../homepage/components/policies";
//import './contactus.css';
//https://dev.to/daliboru/how-to-send-emails-from-a-form-in-react-emailjs-27d1
function BootCard(props:any){
	return(
		<Card bg={"dark"} >
			<div style={{margin:"30px"}}><h3 style={props.styles.textcolor}>Get In Touch</h3></div>
			<Card.Body>
				<Card.Title>Hello</Card.Title>
				<Card.Text >
					Hob
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<p >Check it out &rarr; </p>
			</Card.Footer>
		</Card>
	)
}
export default function ContactUs(){
	const [isLoadingLogin, setIsLoadingLogin] = useState<Boolean>(false); // State dealing with loading spinner
	const [formnotcompleted,setFormNotCompleted] = useState<Boolean>(false);
	const [formcompleted,setFormCompleted] = useState<Boolean>(false);
	const maxRowBased = useMediaQuery(maxRowBasedquery)
	const [toSend, setToSend] = useState({
		Name: '',
		message: '',
		reply_to: '',
	  });
	class ContactUsStyles{
		contactustitle:Object;
		contactuscont:Object;
		textcolor:Object;
		contactsub:Object;
		contactsubcont:Object;
		constructor(){
			this.textcolor = {color:"white"}
			this.contactustitle = {display:"flex",justifyContent:"center",position:"relative",top:"40px",marginTop:"20px"}
			this.contactuscont = {display:"flex",justifyContent:"center",position:"relative",top:"70px", gap: maxRowBased ? "350px":"20px",flexDirection: maxRowBased ? "row"  : "column"}
			this.contactsub = {color:"white",marginTop:"5px"}
			this.contactsubcont = {color:"grey",marginRight:"10px",fontSize:"30px"}
		}
	}
	let styles = new ContactUsStyles()

	
	  const onSubmit = (e:any) => {
		setIsLoadingLogin(true);
		setFormNotCompleted(false);
		e.preventDefault();
		e.preventDefault();
		var senddata:any = toSend
		//console.log(senddata)
		if (senddata.Name === "" || senddata.message === "" || senddata.reply_to === ""){
			setIsLoadingLogin(false);
			setFormNotCompleted(true)
			console.log(senddata)
			console.log("Please Complete")
		}
		else{
			send(
				'service_pm06bff',
				'template_9tuj84h',
				senddata,
				'MliRjz_sCPs_ysAVV'
			  )
				.then((response:any) => {
				  console.log('SUCCESS!', response.status, response.text);
				  setIsLoadingLogin(false); 
				  setFormCompleted(true)
				})
				.catch((err) => {
				  console.log('FAILED...', err);
				  setIsLoadingLogin(false); 
				});
		}




		  
	  };

	
	  const handleChange = (e:any) => {
		setToSend({ ...toSend, [e.target.name]: e.target.value });
	  };
	
	/*								
	<div style={{display:"flex"}}>
	<PhoneIcon style={props.styles.contactsubcont}></PhoneIcon>
	<h3 style={props.styles.contactsub}>Phone</h3>
	</div> 
	<div>
	<p style={{position:"relative",left:"40px",color:"white"}}>+44 'Business Number'</p>
	</div>*/
	function ContactDetails(props:any){
		return(
			<div className="contact row">
			<div style={{position:"relative",top:"20px", left:maxRowBased ? "none" : "20px"}}>
				<div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
					<h2 style={{color:"white"}}>Contact Us</h2>
					<div style={{display:"flex"}}>
						<EmailIcon style={props.styles.contactsubcont}></EmailIcon>
						<h3 style={props.styles.contactsub}>Email Address:</h3>
						
					</div>
					<div>
						<p style={{position:"relative",left:"40px",color:"white"}}>amari.lawal@gmail.com</p>
					</div>
					{/*Phone Icon Here*/}

					<div style={{display:"flex"}}>
						<GitHubIcon style={props.styles.contactsubcont}/>
						<h3 style={props.styles.contactsub}>Github:</h3>
					</div>
					<div>
						<a href="https://github.com/Amari-Lawal/" target="_blank" rel="noopener noreferrer" style={{position:"relative",left:"40px",color:"white"}}>https://github.com/Amari-Lawal</a>
					</div>
					<div style={{display:"flex"}}>
						<LanguageIcon style={props.styles.contactsubcont}/>
						<h3 style={props.styles.contactsub}>Website</h3>
					</div>
					<div>
						<a href="https://amari.dev" target="_blank" rel="noopener noreferrer" style={{position:"relative",left:"40px",color:"white"}}>https://amari.dev</a>
					</div>
				</div>
			</div>
			
		
		
		</div>
		)
	}
	function EmailPrompt(props:any){
		return(
			<div >
				<div className="contact row">
					<div style={{height:"60vh",width:"400px",backgroundColor:"white",borderRadius:"10px",position: "relative" ,left: maxRowBased ? "none" :"20px"}}>
						<div style={{display:"flex",position:"relative",top:"40px",left:"15%"}}>
							<div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
								<h1 style={{color:"black",fontSize:"20px"}}>Get In Touch</h1>
								<input
									type='text'
									name='Name'
									placeholder='Name'
									value={toSend.Name}
									onChange={handleChange}
								/>

								<input
									type='text'
									name='reply_to'
									placeholder='Your email'
									value={toSend.reply_to}
									onChange={handleChange}
								/>
								<textarea
								style={{height:"100px",border:"0px"}}
									name='message'
									placeholder='Your message'
									value={toSend.message}
									onChange={handleChange}
								/>
								
								<Button variant="contained" onClick={onSubmit}>Submit</Button>
								{isLoadingLogin ? <LoadingSpinner /> : null}
								{formnotcompleted && <p>Please Complete Form!</p>}
								{formcompleted && <p>Email Sent!</p>}

							</div>
						</div>
					</div>
				</div>
				
			</div>
		)
	}
	return(
		<div>
			{ maxRowBased ? 
			<div>
			<HeaderComponent/>
			<div style={styles.contactustitle} className="ContactusTitlecont">
				<h1 style={{color:"white"}}>Contact Us</h1>
			</div>
			<div style={styles.contactuscont} className="ContactusTitlecont">
					<ContactDetails styles= {styles}/>
					<EmailPrompt/>
					
			</div>
			<Policies></Policies>
			</div>
			: 
			<div>
				<HeaderComponent/>
				<div style={styles.contactustitle} className="ContactusTitlecont">
					<h1 style={{color:"white"}}>Contact Us</h1>
				</div>
				<div style={styles.contactuscont} className="ContactusTitlecont">
						<EmailPrompt/>
						<ContactDetails styles= {styles}/>
						
						
				</div>
			</div>
			}


		</div>
    )

}

/*										
<input onChange={(e:any) => {setName(e.target.value)}} style={{width:"100%"}} placeholder="Name"></input>
<input onChange={(e:any) => {setEmail(e.target.value)}} style={{width:"100%"}} placeholder="Email"></input>
<input onChange={(e:any) => {setSubject(e.target.value)}} style={{width:"100%"}} placeholder="Subject"></input>
<input onChange={(e:any) => {setMessage(e.target.value)}} style={{height: "100px",padding: "10px",width:"100%"}} placeholder="Message"></input>
<Button onClick={sendEmail} variant="contained"  >Send Message</Button>
										 */