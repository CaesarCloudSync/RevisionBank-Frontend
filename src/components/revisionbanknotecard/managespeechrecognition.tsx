import RevisionBankSpeechRecognition from "../speechrecognition/speechrecognition";
import {useSpeechRecognition} from "react-speech-recognition"
export default function ManageRevisionCardSpeechRecognition(props:any){
    const { transcript, resetTranscript } = useSpeechRecognition();
    //  onChange={(e:any) => {props.setNewRevisionCard((items:any)=> ({...props.index,revisioncardind:props.index,newrevisoncard:e.target.value}))} } defaultValue={props.revisioncard.revisioncard} n
    //  props.handleFormChange(props.transcript,props.index,true)
    const handleFormChange = (transcript:any,index:any,speecrecog:any) =>{
        console.log(transcript)
        props.setNewRevisionCard((items:any)=> ({...props.index,revisioncardind:props.index,newrevisoncard:transcript}))
         

    }
    return( <RevisionBankSpeechRecognition resetTranscript={resetTranscript} transcript={transcript} formFields={props.revisioncard.revisioncard} handleFormChange={handleFormChange} index={props.index}></RevisionBankSpeechRecognition>
    )
}