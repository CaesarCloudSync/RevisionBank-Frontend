import { useEffect, useState } from "react"

import UploadIcon from '@mui/icons-material/Upload';
export default function RevisionCardImageNames(props:any){
    const [oldimagename,setOldImageName] = useState(props.revisioncardimgname[props.index])
    const [oldimage,setOldImage] = useState(props.revisioncardimage[props.index])
    const [newimage,setNewImage] = useState("")

	const changeHandler = (event:any,index:number) => {
        console.log(index)
                
        const reader=new FileReader();
        reader.onload=(tessevent:any)=>{
        const imagefile= tessevent.target.result;
        //console.log(image)
        const imagenamefile = event.target.files[0].name
        console.log(imagenamefile)
        setOldImageName(imagenamefile)
    setNewImage(imagefile)
      
       
       
        //setOldImageName(imagenamefile)


    }
    reader.readAsDataURL(event.target.files[0]);
	};
    
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
                <p>{oldimagename}</p>
                <input  type="file" id={`actual-btn_${props.cardindex}_${props.index}`} accept=".png,.jpg,.jpeg,.gif" onChange={(e) =>{changeHandler(e,props.index)}}/>

                <label style={{cursor:"pointer"}} htmlFor={`actual-btn_${props.cardindex}_${props.index}`} >
                {/**<UploadIcon sx={{ "&:hover": { color: "blue" } }} style={{fontSize:"20px"}}/> */}
                </label>
            </div>


            {newimage === ""? <img key={`old_img_${props.cardindex}_${props.index}`} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={oldimage}></img>:
            <img key={`new_img_${props.cardindex}_${props.index}`} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={newimage}></img>}
                    </div>
                )

    

}