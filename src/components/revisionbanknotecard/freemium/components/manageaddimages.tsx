import ManageAddImage from "./manageaddimage";
import { useState } from "react";
export default function ManageAddImages(props:any){
    const [numaddsleft,setNumAddsLeft] = useState(3 - props.revisioncard.revisioncardimgname.length)
    const [numaddstorender,setNumAddsToRender] = useState(new Array(3 - props.revisioncard.revisioncardimgname.length).fill("abc").map((val, i) => val+(i+1)))
  

    
    return(
        <div >
            <ManageAddImage subject={props.subject} revisioncardtitle={props.revisioncardtitle} token={props.token} numaddsleft={numaddsleft}  cardindex={props.cardindex} index={0}  ></ManageAddImage>
        </div>
    )

}