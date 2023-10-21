import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import UploadIcon from '@mui/icons-material/Upload';
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
    const changeImage = () =>{
        setLoading(true)
        let subject = props.subject
        let revisioncardtitle = props.revisioncardtitle
        console.log(subject)
        console.log(revisioncardtitle)
        console.log(oldimagename)
        console.log(newimagename)
        console.log(newimage)
        // All data here that is neededd to change image in backend is here. Just make the axios api call here.
        // TODO Next set up adding new images do that in managerevisioncardsinfo.tsx
        // setLoading(false)
        // setOldImageName(newimagename)
        // setOldImage(newimage)
        // setNewImagename("");
        // setNewImage("")

        
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
            <Button style={{backgroundColor:"grey",width:"100px",border:"1px solid grey",height:"30px",fontSize:"13px"}}>Submit</Button>

            }


            {editingimage === false ?  <img key={`old_img_${props.cardindex}_${props.index}`} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={oldimage}></img>:
            <img key={`new_img_${props.cardindex}_${props.index}`} style={{width:props.maxRowBased ? "55%": "75%" ,height: props.maxRowBased ? "55%" : "75%"}} src={newimage}></img>
            }
            
            
        </div>
            )

    

}