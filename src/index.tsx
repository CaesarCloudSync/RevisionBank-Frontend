import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FmathQP from './components/fmathqp';
import FmathQPDF from './components/fmathqpdf';
import FmathSB from './components/fmathsb';
import FmathSBPDF from './components/fmathsbpdf';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
ReactDOM.render(
  <Router>
  <Routes>
  <Route path="/" element={<Homepage/>}/>
  <Route path="/fmathqp" element={<FmathQP/>}/>
  <Route path="/fmathqp/pdf" element={<FmathQPDF/>}/>
  <Route path="/fmathsb" element={<FmathSB/>}/>
  <Route path="/fmathsb/pdf" element={<FmathSBPDF/>}/>
  
  </Routes>
  </Router>
  ,
  document.getElementById('root')
);

