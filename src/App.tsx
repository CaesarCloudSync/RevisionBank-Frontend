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
import RevisionBankOptions from './components/revisionbanks/revisionbank';

import ContactUs from './components/contact us/contactus';
import Payment from './components/pricing/payment';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import PricingPage from './components/pricing/pricing';
import Billing from './components/pricing/billing';
import CompleteFreeTrial from './components/freetrial/freetrial';
import TermsOfServices from './components/termsofservices/termsofservices';
import PrivacyPolicy from './components/privacypolicy/privacypolicy';
import CookiePolicy from './components/cookiepolicy/cookiepolicy';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import RevisionBankTools from './components/revisionbanktools/revisionbanktools'
import AccountPage from './components/account/account';
import ConfirmDeleteAccount from './components/account/confirmdeleteaccount';
import ConfirmDeleteSubscription from './components/account/confirmdeletesubscription';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './components/forgotpassword/resetpassword';
import FreeTrialAuth from './components/freetrial/freetrialauth';
import EdexcelMaths from './components/edxecelmaths/edexcelmaths';
import EdexcelPdf from './components/edxecelmaths/edexcelpdf';
import RevisionBankScheduler from './components/revisionbanknotecard/freemium/revisionbanknotecard';
import ManageRevisionCards from './components/revisionbanknotecard/freemium/components/managerevisioncards'
import ComputerScienceAQA from './components/computerscience/computerscienceaqa';
import ComputerSciencePDF from './components/computerscience/computersciencepdf';
import PhysicsOCR from './components/physicsocr/physicsocr';
import ChemistryAQA from './components/chemistry/chemistry';
import { Helmet } from "react-helmet";
import BiologyAQA from './components/biologyaqa/biologyaqa';
import AmariTimeTable from './components/amarialevelTimetable/amaritimetable';
import FeedBackPage from './components/fmaths/feedback';
import ManageRevisionCardsWorkspace from './components/revisionbanknotecard/premiumworkspace/components/managerevisioncards';
import RevisionBankSchedulerWorkSpace from './components/revisionbanknotecard/premiumworkspace/revisionbanknotecard';
const App = () => {
return(
  <Router>
  <Helmet>
  <title>RevisonBank</title>
  <meta
  name="description"
  content="Revision practice papers, exam questions and revision cards for AS and A level students."
  />
  <meta
      name="keywords"
      content="Revision,revision bank,revisionbank,Revision Bank,RevisionBank,solutionbank,solution bank year 1,solution bank pure maths year 1,revision village,solution bank year 1 stats,solution bank year 2,solution bank,Solutionbank,Solution Bank,A Level revision, Practice Papers, Revision Bank, Revision Bank Scraper, Revision Bank Scraper for A Level, Revision Bank Scraper for O Level, Revision Bank Scraper for GCSE, Revision Bank Scraper for IB, Revision Bank Scraper for A Level Practice Papers, Revision Bank Scraper for O Level Practice Papers, Revision Bank Scraper for GCSE Practice Papers, Revision Bank Scraper for IB Practice Papers, Revision Bank Scraper for A Level Revision Cards, Revision Bank Scraper for O Level Revision Cards, Revision Bank Scraper for GCSE Revision Cards, Revision Bank Scraper for IB Revision Cards, Revision Bank Scraper for A Level Revision Practice Papers, Revision Bank Scraper for O Level Revision Practice Papers, Revision Bank Scraper for GCSE Revision Practice Papers, Revision Bank Scraper for IB Revision Practice Papers, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB"
  />
  </Helmet>
  <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/contactus" element={<ContactUs/>}/>
  <Route path="/amaritimetable" element={<AmariTimeTable/>}></Route>
  <Route path="/feedback" element={<FeedBackPage/>}></Route>
  
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

  <Route path="/revisionbanknotecard" element={<RevisionBankScheduler/>}/>
  <Route path="/revisioncards" element={<ManageRevisionCards/>}/>
  
  <Route path="/revisionbanknotecardworkspace" element={<RevisionBankScheduler/>}/>
  <Route path="/revisioncardsworkspace" element={<ManageRevisionCards/>}/>

  <Route path="/fmathqp" element={<FmathQP/>}/>
  <Route path="/edexcelmaths" element={<EdexcelMaths/>}/>
  <Route path="/computerscienceaqa" element={<ComputerScienceAQA/>}/>
  <Route path="/edexcelmaths/:pdfpaper" element={<EdexcelPdf/>}/>
  <Route path="/computerscienceaqa/:pdfpaper" element={<ComputerSciencePDF/>}/>
  <Route path="/physicsocr" element={<PhysicsOCR/>}/>
  <Route path="/chemistryaqa" element={<ChemistryAQA/>}/>
  <Route path="/biologyaqa" element={<BiologyAQA/>}/>
  
  <Route path="/fmathsb" element={<FmathSB/>}/>
  <Route path="/physicsaqa" element={<PhysicsAqa/>}/>
  <Route path="/ocrscience" element={<OCRScience/>}/>

  
  <Route path="/fmathqp/pdf" element={<FmathQPDF/>}/>
  <Route path="/fmathsb/pdf" element={<FmathSBPDF/>}/>
  <Route path="/physicsaqa/pdf" element={<PhysicsAQAPDF/>}/>
  <Route path="/ocrscience/pdf" element={<OCRSciencePDF/>}/>
  <Route path="*" element={<HomePage/>}/>
  
  
  
  
  
  </Routes>
  </Router>
)
}
export default App ;
