import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
export default function RevisionCardImageNames(props:any){
    const [oldimagename,setOldImageName] = useState(props.revisioncardimgname[props.index])
    const [oldimage,setOldImage] = useState(props.revisioncardimage[props.index])
    const [newimage,setNewImage] = useState("")
    const[newimagename,setNewImageName] = useState("");
    const [editingimage,setEditingImage] = useState(false);
    const [loading,setLoading] = useState(false)

	const changeHandler = (event:any,index:number) => {

                
        const reader=new FileReader();
        reader.onload=(tessevent:any)=>{
        const imagefile= tessevent.target.result;
        //console.log(image)
        const imagenamefile = event.target.files[0].name
        setNewImageName(imagenamefile)
        setNewImage(imagefile)
        setEditingImage(true)
       
       
        //setOldImageName(imagenamefile)


    }
    reader.readAsDataURL(event.target.files[0]);
	}
    const resetImage = () =>{
        setEditingImage(false)
        setNewImage("")
        setNewImageName("");
    }
    const changeImage = async () =>{
        setLoading(true)
        let subject = props.subject
        let revisioncardtitle = props.revisioncardtitle
        /*console.log(subject)
        console.log(revisioncardtitle)
        console.log(oldimagename)
        console.log(newimagename)
        console.log(newimage)*/
        let json_data = {"subject":subject,"revisioncardtitle":revisioncardtitle,"oldimagename":oldimagename,"newimagename":newimagename,"newimage":newimage}
        const config = {headers: {Authorization: `Bearer ${props.token}`,}}
        const response = await axios.post("http://192.168.0.22:8080/changecardimage",json_data,config)
        console.log(response.data)
        // All data here that is neededd to change image in backend is here. Just make the axios api call here.
        // TODO Next set up adding new images do that in managerevisioncardsinfo.tsx
        window.location.reload();


        
    }
    
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            {editingimage === false ?
            <div style={{display:"flex"}}>
            
                <p>{oldimagename}</p>
                <input  type="file" id={`actual-btn_${props.cardindex}_${props.index}`} accept=".png,.jpg,.jpeg,.gif" onChange={(e) =>{changeHandler(e,props.index)}}/>

                <label style={{cursor:"pointer"}} htmlFor={`actual-btn_${props.cardindex}_${props.index}`} >
                <UploadIcon sx={{ "&:hover": { color: "blue" } }} style={{fontSize:"20px"}}/> 
                </label>
            </div>
            :
            loading === false ?
            <div style={{display:"flex",gap:"10px",margin:"10px"}}>
            
            <p>{newimagename}</p>
            
            <Button onClick={()=>{changeImage()}} onTouchStart={() =>{changeImage()}} style={{backgroundColor:"#00008B",width:"100px",border:"1px solid #00008B",height:"30px",fontSize:"13px"}}>Submit</Button>
            <a onClick={()=>{resetImage()}} onTouchStart={() =>{resetImage()}} style={{cursor:"pointer"}} id={`actual-cross_${props.cardindex}_${props.index}`} >x</a>
            
    
            </div>
            :
            <div></div>

            }


            {editingimage === false ?  <img key={`old_img_${props.cardindex}_${props.index}`} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={oldimage}></img>:
            <img key={`new_img_${props.cardindex}_${props.index}`} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={newimage}></img>
            }
            
            
        </div>
            )

    

}