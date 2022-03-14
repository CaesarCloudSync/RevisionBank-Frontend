import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/homepage/homepage';
import FmathQP from './components/fmaths/fmathqp';
import FmathQPDF from './components/fmaths/fmathqpdf';
import FmathSB from './components/fmaths/fmathsb';
import FmathSBPDF from './components/fmaths/fmathsbpdf';
import PhysicsAqa from './components/AQA/physicsaqa';
import PhysicsAQAPDF from './components/AQA/physicsaqapdf';
import OCRScience from './components/OCR/ocrscience';
import OCRSciencePDF from './components/OCR/ocrsciencepdf';
import STEMScraperOptions from './components/subscriptionscraper/stemscraper';

import Payment from './components/pricing/payment';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import PricingPage from './components/pricing/pricing';
import Billing from './components/pricing/billing';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
//<PrivateRoute path="/stemscraper" component={<STEMScraperOptions/>} />
ReactDOM.render(
  <Router>
  <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/signin" element={<Signin/>}/>

  <Route path="/pricing" element={<PricingPage/>}/>
  <Route path="/stemscraper" element={<STEMScraperOptions/>}/>
  <Route path="/payment" element={<Payment/>}/>
  <Route path="/billing" element={<Billing/>}/>

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

