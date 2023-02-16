import { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import microPhoneIcon from "./logo.svg";
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
export default function RevisionBankSpeechRecognition(props:any) {
  /*
  useEffect(() =>{
  
    props.handleFormChange(props.transcript,props.index,true)
  },[transcript])
  */
  const [isListening, setIsListening] = useState(false);
  const microphoneRef:any = useRef(null);
  const miciconstyle = {"marginTop":"10px","width":"50px","height":"50px","borderRadius": "50%",border:"1px solid #264be4",color:"white",backgroundColor:"#264be4"}
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    //props.handleFormChange(props.transcript,props.index,true)
    
  };
  const handleReset = () => {
    stopHandle();
    props.resetTranscript();
  };
  const AddToCard = () => {
    stopHandle();
    props.handleFormChange(props.transcript,props.index,true)
    props.resetTranscript();
    
  }
  
  console.log(props.transcript)
  /*
  if (transcript !== ""){
    props.handleFormChange(transcript,props.index,true)
  }*/
  //console.log(transcript,"hi")
  // && props.index === 0
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={isListening ? stopHandle:handleListing}
        >

          {isListening ? <MicIcon style={miciconstyle}></MicIcon>:<MicNoneIcon style={miciconstyle}></MicNoneIcon> }
        </div>
      </div>
      {props.transcript && (
          <div style={{display:"flex",gap:"10px"}}>
            <div className="microphone-result-text">{props.transcript}</div>
          <button style={{fontSize:"13px"}} className="microphone-reset btn" onClick={AddToCard}>
            Add to Card
          </button>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
          </div>
      )}
    </div>
  );
}
