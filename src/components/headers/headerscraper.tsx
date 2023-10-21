//import HeaderStyled from "./headerStyles";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './headerhome.css'
import RevisionBankLogo from '../static/RevisionBankLogo.svg';
import { maxRowBasedquery } from '../mediahooks/mediamax';
import useMediaQuery from '../mediahooks/useMedia';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//https://alvarotrigo.com/blog/hamburger-menu-css/
//https://javascript.plainenglish.io/how-to-create-a-responsive-navbar-with-react-bb9ce4cebddd
// https://codepen.io/rares-lungescu/pen/KLbMvo

export default function HeaderScraper(props:any){       
  //<h2>STEMTutorBank.</h2>
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  const maxRowBased =useMediaQuery(maxRowBasedquery)
  const getEmail = async (token:any) => {
    const config = {headers: {Authorization: `Bearer ${token}`,}}
    const response:any = await axios.get(`http://192.168.0.22:8080/getemail`,config); // Send login post request.
    const email = response.data.email
    setEmail(email)
  }
  useEffect(() => {
    //Runs only on the first render
    getEmail(props.token)
  },[]);
  
  //console.log(email)
  //const email = getEmail(props.token)
    return(
    <div>
        <header className="container header">
         
         <nav className="nav">
           <div className="logo">
             <Link to="/"><img src={RevisionBankLogo}></img></Link>
           </div>
           {maxRowBased ? 
           <div></div>
           
           :
            <div style={{position:"absolute", left:"80%",top:"8%"}}>
             
              <a href="/account" className="nav_menu_link"><AccountCircleIcon onClick={() => navigate('/account',{state:{"token":props.token}})} style={{fontSize:"40px",color:"white"}}/></a>
            
            </div>
              }
   
           <div className="nav_menu" id="nav_menu">
             <button className="close_btn" id="close_btn">
               <i className="ri-close-fill"></i>
             </button>
   
             <ul className="nav_menu_list">
                <li className="nav_menu_item">
                    <a id="navHello" >{email}</a>
                </li>
               <li className="nav_menu_item">
                 <a href="/account" className="nav_menu_link"><AccountCircleIcon onClick={() => navigate('/account',{state:{"token":props.token}})} style={{fontSize:"40px"}}/></a>
               </li>
             </ul>
           </div>
   
           <button className="toggle_btn" id="toggle_btn">
             <i className="ri-menu-line"></i>
           </button>
         </nav>
       </header>

    </div>
    
    )
    
}
//<img style={styles.logo} src={logo} alt=''></img>
/*   <Box style={styles.navbar}>
<Button style={styles.logocont} >
<img style={styles.logo} src={logo} alt=''></img>
</Button>
{pages.map((page) => Items(page))}
</Box>
*/
