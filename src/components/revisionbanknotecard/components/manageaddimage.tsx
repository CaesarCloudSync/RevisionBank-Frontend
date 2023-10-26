import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
export default function ManageAddImage(props:any){
    const [newaddimage,setNewAddImage] = useState("");
    const [newaddimagename,setNewAddImageName] = useState("");
    const [startingnumtoadd,setStartingNumtoAdd] = useState(0)
    const [loading,setLoading] = useState(false)
    
    const changeHandler = (event:any,index:number) => {

                
        const reader=new FileReader();
        reader.onload=(tessevent:any)=>{
        const imagefile= tessevent.target.result;
        //console.log(image)
        const imagenamefile = event.target.files[0].name
        console.log(imagefile)
        setNewAddImage(imagefile)
        setNewAddImageName(imagenamefile)

        //setNewImageName(imagenamefile)
        //setNewImage(imagefile)
        //setEditingImage(true)
       
       
        //setOldImageName(imagenamefile)


    }
    reader.readAsDataURL(event.target.files[0]);
	}
    const resetImage = () =>{
        setNewAddImage("")
        setNewAddImageName("");
  

    }
    const manageaddcardimage = async () =>{
        if (newaddimagename !== ""){
            setLoading(true)
            const config = {headers: {Authorization: `Bearer ${props.token}`,}}
            let subject = props.subject
            let revisioncardtitle = props.revisioncardtitle

            const json_data = {"subject":subject,"revisioncardtitle":revisioncardtitle,"newimagename":newaddimagename,"newimage":newaddimage}

            const response = await axios.post("https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/manageaddcardimage",json_data,config)
            const result = response.data
            if ("error" in result){
                alert(`Error:${result.error}`)

            }
            else{
                
                window.location.reload();
                setLoading(false)
            }
        }
        else{
            alert("Type into field please.")
        }
    }

    return(
        <div >
            {newaddimagename === ""?
            <div>
            <input  type="file" id={`control_${props.cardindex}_${props.index}`} accept=".png,.jpg,.jpeg,.gif" onChange={(e) =>{changeHandler(e,props.index)}}/>

            <label style={{cursor:"pointer"}} htmlFor={`control_${props.cardindex}_${props.index}`} >
            <ControlPointIcon sx={{ "&:hover": { color: "blue" } }} style={{fontSize:"40px"}}></ControlPointIcon>
            </label>
            </div>
        :
        <div >
            <div style={{display:"flex",gap:"10px"}}>
                <p>{newaddimagename}</p>
                {loading !== true && <a style={{cursor:"pointer"}} onClick={()=>{resetImage()}}>x</a>}
                {loading !== true && <Button onTouchStart={() => {manageaddcardimage()}} onClick={() => {manageaddcardimage()}}  style={{backgroundColor:"#00008B",width:"100px",border:"1px solid #00008B",height:"30px",fontSize:"13px"}}>Submit</Button>
                }

                </div>
            <img key={`new_add_img_${props.cardindex}_${props.index}`}  src={newaddimage}></img>
        </div>
                    }
        </div>
        
        
    )
 }