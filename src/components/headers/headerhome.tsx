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
import STEMTutorBankLogo from '../static/STEMTutorBankLogo.svg';

//https://javascript.plainenglish.io/how-to-create-a-responsive-navbar-with-react-bb9ce4cebddd
// https://codepen.io/rares-lungescu/pen/KLbMvo

function HeaderComponent(){       
  //<h2>STEMTutorBank.</h2>
    return(
    <div>
        <header className="container header">
         
         <nav className="nav">
           <div className="logo">
             <Link to="/"><img src={STEMTutorBankLogo}></img></Link>
           </div>
   
           <div className="nav_menu" id="nav_menu">
             <button className="close_btn" id="close_btn">
               <i className="ri-close-fill"></i>
             </button>
   
             <ul className="nav_menu_list">
               <li className="nav_menu_item">
                 <a href="/pricing" className="nav_menu_link"><p>Pricing</p></a>
               </li>
               <li className="nav_menu_item">
                 <a href="/about" className="nav_menu_link"><p>about</p></a>
               </li>
               <li className="nav_menu_item">
                 <a href="/signin" className="nav_menu_link"><p>Signin</p></a>
               </li>
               <li className="nav_menu_item">
                 <a href="/signup" className="nav_menu_link"><p>Signup</p></a>
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