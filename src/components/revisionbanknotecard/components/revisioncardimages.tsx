
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';
export default function RevisionCardImages(props:any){
    const [oldimagename,setOldImageName] = useState(props.revisioncardimgname[props.ind])
    const [oldimage,setOldImage] = useState(props.revisioncardimage[props.ind])
    const changeHandler = (event:any) => {
        console.log(event.target.files[0])
	};
    if (props.currentuse === "names"){
        return(
            <th key={oldimagename} style={{textAlign:"left"}}>{oldimagename} 
            <input type="file" id="actual-btn" onChange={changeHandler}/>

                <label style={{cursor:"pointer"}} htmlFor="actual-btn">
                <UploadIcon sx={{ "&:hover": { color: "blue" } }} style={{fontSize:"20px"}}/>
                </label>
            </th>
        )
    }
    else if (props.currentuse === "image") {
        return(
            <td >
                <img key={oldimage} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={oldimage}></img>
            </td>
        )

    }
    else{
        return(<div></div>)
    }

}