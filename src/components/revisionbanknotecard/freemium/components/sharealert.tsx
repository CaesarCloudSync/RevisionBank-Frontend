import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';

export default function ShareAlert(props:any){
    //style={{width: "150px",height: "150px",display: "flex",justifyContent: "center",alignItems: "center",backgroundColor: "red",wordBreak: "break-all"}}
    const [linkpressed,setLinkPressed] = useState(false)
    const linkcolor = linkpressed === true ? "blue" : "black"
    return(
        <div style={{position:"fixed",zIndex:99,width:"700px",height:"300px",borderRadius:"10px",bottom:props.maxRowBased ? "auto":"0px"}}>
            
                <div style={{position:"fixed",left:props.maxRowBased ? "auto" :"40%",zIndex:99,width:props.maxRowBased ? "700px": "200px",height:props.maxRowBased ? "300px" :"150px",border:"1px solid black",borderRadius:"10px",backgroundColor:"white"}}>
                            <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <div style={{position:"relative",top:"10px",right:"15px",fontSize:"20px"}}>
                                <p style={{cursor: "pointer"}} onClick={()=> {props.setShareShow(false);props.setShareURL("")}}>X</p>
                            </div>
                            </div>
                            
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:props.maxRowBased ? "auto" :"10px"}}>
                                <h2>Share RevisionCard</h2>
                            </div>
                            {props.maxRowBased === true ?
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>
                            <div style={{border:"1px solid black",borderRadius:"10px",width:props.maxRowBased ? "600px": "200px",height:"100px"}}>
                                <div style={{margin:props.maxRowBased ? "5px": "10px"}}>
                                <p style={{wordWrap: "break-word"}}>{props.shareurl}</p>
                                
                                </div>

                            </div>

                        </div>:
                        <div>

                        </div>
                        
                            }

                            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>
                                <LinkIcon onClick={() => {navigator.clipboard.writeText(props.shareurl);setLinkPressed(true)}} style={{fontSize:"25px",cursor:"pointer",color:linkcolor}}></LinkIcon>
                            </div>


                </div>
                
        </div>
    )
    }
 

