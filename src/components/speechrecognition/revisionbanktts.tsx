import React, { useState, useEffect } from "react";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
export default function RevisionBankTextToSpeech({ text }:any){
  const [isPaused, setIsPaused] = useState(false);
  const [utterances, setUtterance] = useState<any>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const ulist =  text.match(/.{1,100}/g).map((chars:any) =>{return(new SpeechSynthesisUtterance(chars))})
    //const ulist =  text.match(/.{1,100}/g).map((chars:any) =>{return(new SpeechSynthesisUtterance(chars))})
 
    setUtterance(ulist);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;


    if (isPaused) {
      synth.resume();
    }
    else{
            synth.cancel();

        setIsPaused(false);
    }
    
    const voices = window.speechSynthesis.getVoices();
    utterances.map((utterance:any) =>{
        utterance.voice = voices[7];
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 1
    
        synth.speak(utterance);
    })


    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div style={{display:"flex",gap:"5px"}}>
      <button onClick={handlePlay}>{isPaused ?<PlayCircleIcon style={{cursor:"pointer",fontSize:"30px",color:"blue"}}/> : <VolumeDownIcon style={{color:"blue",cursor:"pointer",fontSize:"30px"}}/>}</button>
      <a style={{cursor:"pointer"}} onClick={handlePause}><PauseIcon style={{fontSize:"30px"}}/></a>
      <a style={{cursor:"pointer"}} onClick={handleStop}><StopIcon style={{fontSize:"30px",color:"red"}}/></a>
    </div>
  );
};

