import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './src/components/homepage/homepage';

import FmathQP from './src/components/fmaths/fmathqp';
import FmathQPDF from './src/components/fmaths/fmathqpdf';
import FmathSB from './src/components/fmaths/fmathsb';
import FmathSBPDF from './src/components/fmaths/fmathsbpdf';
import PhysicsAqa from './src/components/AQA/physicsaqa';
import PhysicsAQAPDF from './src/components/AQA/physicsaqapdf';
import OCRScience from './src/components/OCR/ocrscience';
import OCRSciencePDF from './src/components/OCR/ocrsciencepdf';
import RevisionBankOptions from './src/components/revisionbanks/revisionbank';

import ContactUs from './src/components/contact us/contactus';
import Payment from './src/components/pricing/payment';
import Signin from './src/components/auth/signin';
import Signup from './src/components/auth/signup';
import PricingPage from './src/components/pricing/pricing';
import Billing from './src/components/pricing/billing';
import CompleteFreeTrial from './src/components/freetrial/freetrial';
import TermsOfServices from './src/components/termsofservices/termsofservices';
import PrivacyPolicy from './src/components/privacypolicy/privacypolicy';
import CookiePolicy from './src/components/cookiepolicy/cookiepolicy';
//import { BrowserSwitch as Switch, Route ,Routes} from "react-router-dom";
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
  } from "react-router-dom";
  
import RevisionBankTools from './src/components/revisionbanktools/revisionbanktools'
import AccountPage from './src/components/account/account';
import ConfirmDeleteAccount from './src/components/account/confirmdeleteaccount';
import ConfirmDeleteSubscription from './src/components/account/confirmdeletesubscription';
import ForgotPassword from './src/components/forgotpassword/forgotpassword';
import ResetPassword from './src/components/forgotpassword/resetpassword';
import FreeTrialAuth from './src/components/freetrial/freetrialauth';
import EdexcelMaths from './src/components/edxecelmaths/edexcelmaths';
import EdexcelPdf from './src/components/edxecelmaths/edexcelpdf';
import RevisionBankScheduler from './src/components/revisionbankscheduler/revisionbankscheduler';
import ManageRevisionCards from './src/components/revisionbankscheduler/components/managerevisioncards'

export default (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/contactus" element={<ContactUs/>}/>
    
    <Route path="/termsofservice" element={<TermsOfServices/>}/>
    <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
    <Route path="/cookiepolicy" element={<CookiePolicy/>}/>
    
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/freetrialauth" element={<FreeTrialAuth/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route path="resetpassword" element={<ResetPassword/>}/>
    <Route path="/account" element={<AccountPage/>}/>
    <Route path="/confirmdeleteaccount" element={<ConfirmDeleteAccount/>} />
    <Route path="/confirmdeletesubscription" element={<ConfirmDeleteSubscription/>} />
  
    <Route path="/pricing" element={<PricingPage/>}/>
    <Route path="/revisionbank" element={<RevisionBankOptions/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/billing" element={<Billing/>}/>
    <Route path="/completefreetrial" element={<CompleteFreeTrial/>}></Route>
    
    <Route path="/revisionbanktools" element={<RevisionBankTools/>}/>
    <Route path="/revisionbankscheduler" element={<RevisionBankScheduler/>}/>
    <Route path="/revisioncards" element={<ManageRevisionCards/>}/>
    <Route path="/fmathqp" element={<FmathQP/>}/>
    <Route path="/edexcelmaths" element={<EdexcelMaths/>}/>
    <Route path="/edexcelmaths/:pdfpaper" element={<EdexcelPdf/>}/>
    <Route path="/fmathsb" element={<FmathSB/>}/>
    <Route path="/physicsaqa" element={<PhysicsAqa/>}/>
    <Route path="/ocrscience" element={<OCRScience/>}/>
  
    
    <Route path="/fmathqp/pdf" element={<FmathQPDF/>}/>
    <Route path="/fmathsb/pdf" element={<FmathSBPDF/>}/>
    <Route path="/physicsaqa/pdf" element={<PhysicsAQAPDF/>}/>
    <Route path="/ocrscience/pdf" element={<OCRSciencePDF/>}/>
    <Route path="*" element={<HomePage/>}/>
    
    </Routes>
    </BrowserRouter>

  )


