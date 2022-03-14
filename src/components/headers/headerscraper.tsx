//import HeaderStyled from "./headerStyles";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import STEMRoadMaplogo from '../STEMRoadmap.svg';
import logo from '../RoadmapLogo.svg'
//https://javascript.plainenglish.io/how-to-create-a-responsive-navbar-with-react-bb9ce4cebddd
// https://codepen.io/rares-lungescu/pen/KLbMvo
const NavBar = styled.nav`
height: 100px;
width: 100%;
background: #111316;
color: white;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 2rem;
font-size: 1.2rem;
`
const NavLeftmargintop = "2.3rem" // 1.5
const NavBarLogo = styled(Link)`
    text-decoration: none;
    color: white;
    :nth-child(n + 2) {
        margin-top: ${NavLeftmargintop};
    }
`
const NavBarLinks = styled.div`
display: grid;
grid-template-columns: repeat(6, auto);
grid-gap: 20px;
list-style: none;
text-align: center;
`
const NavBarLink = styled(Link)`
    text-decoration: none;
    color: white;
    transition: 0.3s all;
    :hover{
        color: red;
    }
`
const NavBarIcon = styled(Link)`
display: none;
font-size: 2rem;
cursor: pointer;
`
const RoadMapLogo = styled.img`
    width: 80px;
    height: 80px;
    margin-left: 30px;`
// <RoadMapLogo src={logo} alt="logo" />
function HeaderComponent(){
    //var styles = new HeaderStyled();        
    return(
    <div>
    <NavBar className="navbar">
        <NavBarLinks >
            <NavBarLink to="/" className="nav-link">
                <RoadMapLogo src={logo} alt=''/>
            </NavBarLink>
            <NavBarLogo to="/fmathqp" className="nav-logo" >
                FmathQP
            </NavBarLogo>
            <NavBarLogo to="/fmathsb" className="nav-logo" >
                FmathSB
            </NavBarLogo>
            <NavBarLogo to="/physicsaqa" className="nav-logo" >
                PhysicsAQA
            </NavBarLogo>
            <NavBarLogo to="/ocrscience" className="nav-logo" >
                A Level ScienceOCR
            </NavBarLogo>

        </NavBarLinks>

        <NavBarLinks >
            <li className="nav-item">
                <NavBarLink to="/stemroadmaps" className="nav-link">
                    RoadMaps
                </NavBarLink>
            </li>
            <li className="nav-item">
                <NavBarLink to="/about" className="nav-link">
                    About
                </NavBarLink>
            </li>
            <li className="nav-item">
                <NavBarLink to="/signin" className="nav-link">
                    Sign in
                </NavBarLink>
            </li>
            <li className="nav-item">
                <NavBarLink to="/signup" className="nav-link" >
                    SignUp
                </NavBarLink>
            </li>
        </NavBarLinks>
    </NavBar>
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