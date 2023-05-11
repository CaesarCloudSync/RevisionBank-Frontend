//import HeaderStyled from "./headerStyles";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './headerhome.css'
import RevisionBankLogo from '../static/RevisionBankLogo.svg';
import { maxRowBasedquery } from '../mediahooks/mediamax';
import useMediaQuery from '../mediahooks/useMedia';
import axios from 'axios';
import { useNavigate ,useLocation} from "react-router-dom";
//import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import FolderIcon from '@mui/icons-material/Folder';
//https://alvarotrigo.com/blog/hamburger-menu-css/
//https://javascript.plainenglish.io/how-to-create-a-responsive-navbar-with-react-bb9ce4cebddd
// https://codepen.io/rares-lungescu/pen/KLbMvo

export default function HeaderRevision(props:any){       
  //<h2>STEMTutorBank.</h2>
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  const maxRowBased =useMediaQuery(maxRowBasedquery)
  const location:any = useLocation()
  //console.log(props.token)
    return(
    <div>
        <header className="container header">
         
         <nav className="nav">
           <div className="logo">
             <Link to="/revisionbank"><img src={RevisionBankLogo}></img></Link>
           </div>
           {maxRowBased ? 
           <div></div>
           
           :
           <div>
            <div style={{position:"absolute", left:"47%",top:"9%"}}>
              <a style={{cursor:"pointer"}} id="navHello" onClick={() => navigate('/revisionbank',{state:{"token":props.token}})} >RevisionBank</a>
             </div>
            <div style={{position:"absolute", left:"80%",top:"8%"}}>
            {location.pathname  === "/revisionbanknotecard" &&
              <a href="/revisioncards" className="nav_menu_link"><FolderIcon onClick={() => navigate('/revisioncards',{state:{"token":props.token}})} style={{fontSize:"40px",color:"white"}}/></a>
           }
           { location.pathname === "/revisioncards" &&
           <a  className="nav_menu_link"><NotesIcon onClick={() => navigate('/revisionbanknotecard',{state:{"token":props.token}})} style={{fontSize:"40px",color:"white"}}/></a>
           }
            </div>
            </div>
              }
   
           <div className="nav_menu" id="nav_menu">
             <button className="close_btn" id="close_btn">
               <i className="ri-close-fill"></i>
             </button>
   
             <ul className="nav_menu_list">
                <li className="nav_menu_item">
                    <a style={{cursor:"pointer"}} id="navHello" onClick={() => navigate('/revisionbank',{state:{"token":props.token}})} >RevisionBank</a>
                </li>
                {/*
                <li className="nav_menu_item">
                    <a id="navHello" >Revision Cards</a>
                </li>
                  */}
                {location.pathname  === "/revisionbanknotecard" &&
               <li className="nav_menu_item">
                 <a className="nav_menu_link" style={{cursor:"pointer"}} onClick={() => navigate('/revisioncards',{state:{"token":props.token}})} >Revision Cards</a>
               </li>
               }
              { location.pathname === "/revisioncards" &&
                <li className="nav_menu_item">
                <a  className="nav_menu_link" style={{cursor:"pointer"}} onClick={() => navigate('/revisionbanknotecard',{state:{"token":props.token}})} >Create Revision Card</a>
              </li>
              }               
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
