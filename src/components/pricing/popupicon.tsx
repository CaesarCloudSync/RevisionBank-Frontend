
import React from "react";
import './popupstyle.css';
//https://www.cluemediator.com/create-simple-popup-in-reactjs
const Popup = (props:any) => {
  return (
    
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <>
        <b>Subscription has Expired or doesn't exist</b>
        </>
      </div>
    </div>
 
  );
};
 
export default Popup;