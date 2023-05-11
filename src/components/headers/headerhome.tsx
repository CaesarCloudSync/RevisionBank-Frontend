//import HeaderStyled from "./headerStyles";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import STEMRoadMaplogo from '../static/STEMRoadmap.svg';
import logo from '../static/RoadmapLogo.svg'
import './headerhome.css'
import RevisionBankLogo from '../static/RevisionBankLogo.svg';
import { maxRowBasedquery } from '../mediahooks/mediamax';
import useMediaQuery from '../mediahooks/useMedia';
import { useNavigate } from 'react-router-dom';
//https://alvarotrigo.com/blog/hamburger-menu-css/
//https://javascript.plainenglish.io/how-to-create-a-responsive-navbar-with-react-bb9ce4cebddd
// https://codepen.io/rares-lungescu/pen/KLbMvo

function HeaderComponent(props:any){       
  //<h2>STEMTutorBank.</h2>
  const maxRowBased =useMediaQuery(maxRowBasedquery)
  let navigate:any = useNavigate(); // use navigate hook to navigate to different pages
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
           <div className="hamburger-menu">
              <input id="menu__toggle" type="checkbox" />
              <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
              </label>

              <ul className="menu__box">
                {props.hashedvalue !== null && props.externalrevcardusername !== null ?
                  <li><a className="menu__item"  onClick={() => {navigate(`/signup?h=${props.hashedvalue}&u=${props.externalrevcardusername}`)}} >Signup</a></li>
                  :
                  <li><a className="menu__item" href="/signup">Signup</a></li>
                  }
                
                <li><a className="menu__item" href="/signin">Signin</a></li>
                {/*<li><a className="menu__item" href="/pricing">Pricing</a></li>*/}
                <li><a className="menu__item" href="/contactus">Contact Us</a></li>
              </ul>
            </div>
              }
   
           <div className="nav_menu" id="nav_menu">
             <button className="close_btn" id="close_btn">
               <i className="ri-close-fill"></i>
             </button>
   
             <ul className="nav_menu_list">
              { /*
               <li className="nav_menu_item">
                 <a href="/pricing" className="nav_menu_link"><p>Pricing</p></a>
            </li>*/}
               <li className="nav_menu_item">
                 <a href="/signin" className="nav_menu_link"><p>Signin</p></a>
               </li>
               <li className="nav_menu_item">
                  {props.hashedvalue !== null && props.externalrevcardusername !== null ?
                  <a style={{cursor:"pointer"}} onClick={() => {navigate(`/signup?h=${props.hashedvalue}&u=${props.externalrevcardusername}`)}} className="nav_menu_link"><p>Signup</p></a>
                  :
                 <a href="/signup" className="nav_menu_link"><p>Signup</p></a>
                  }
               </li>
               <li className="nav_menu_item">
                 <a href="/contactus" className="nav_menu_link"><p>Contact Us</p></a>
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
export default HeaderComponent;