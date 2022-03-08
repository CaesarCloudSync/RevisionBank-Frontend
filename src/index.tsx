import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FmathQP from './components/fmathqp';
import FmathQPDF from './components/fmathqpdf';
import FmathSB from './components/fmathsb';
import FmathSBPDF from './components/fmathsbpdf';
import PhysicsAqa from './components/physicsaqa';
import PhysicsAQAPDF from './components/physicsaqapdf';
import OCRScience from './components/ocrscience';
import OCRSciencePDF from './components/ocrsciencepdf';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
ReactDOM.render(
  <Router>
  <Routes>
  <Route path="/" element={<Homepage/>}/>
  <Route path="/fmathqp" element={<FmathQP/>}/>
  <Route path="/fmathsb" element={<FmathSB/>}/>
  <Route path="/physicsaqa" element={<PhysicsAqa/>}/>
  <Route path="/ocrscience" element={<OCRScience/>}/>
  
  <Route path="/fmathqp/pdf" element={<FmathQPDF/>}/>
  <Route path="/fmathsb/pdf" element={<FmathSBPDF/>}/>
  <Route path="/physicsaqa/pdf" element={<PhysicsAQAPDF/>}/>
  <Route path="/ocrscience/pdf" element={<OCRSciencePDF/>}/>
  
  
  
  </Routes>
  </Router>
  ,
  document.getElementById('root')
);

