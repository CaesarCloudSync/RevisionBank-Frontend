import HeaderComponent from "../headers/headerhome"
import TopSection from "./components/topsection"
import AboutSection from "./components/aboutsection"
import InfoSection from "./components/infosection"
import Policies from "./components/policies"
import { Helmet } from 'react-helmet'
import { useEffect} from "react"
import axios from "axios"
//import './style.css'
//https://dev.to/ananiket/create-a-responsive-landing-page-using-html-css-js-b7m
export default function HomePage(){
    //<footer></footer>
    /*
    useEffect(() => {
        // Update the document title using the browser API
        //const newuserjson = {"email":"revisionbankedu@gmail.com","subject":"RevisionBank New User","message":"RevisionBank New User"}
                
        //axios.post("https://palondomus-revb-backend.hf.space/revisionbanksendemail",newuserjson)
      },[]);
      */
    return(
        <div>
        <Helmet>
        <title>RevisonBank | Revision Cards and Practice Questions</title>
        <meta
        name="description"
        content="Revision with practice papers, exam questions for AS and A level students. Schedule revision cards to revise on-the-go."
        />
        <meta
            name="keywords"
            content="Revision,revision bank,revisionbank,Revision Bank,RevisionBank,solutionbank,solution bank year 1,solution bank pure maths year 1,revision village,solution bank year 1 stats,solution bank year 2,solution bank,Solutionbank,Solution Bank,A Level revision, Practice Papers, Revision Bank, Revision Bank Scraper, Revision Bank Scraper for A Level, Revision Bank Scraper for O Level, Revision Bank Scraper for GCSE, Revision Bank Scraper for IB, Revision Bank Scraper for A Level Practice Papers, Revision Bank Scraper for O Level Practice Papers, Revision Bank Scraper for GCSE Practice Papers, Revision Bank Scraper for IB Practice Papers, Revision Bank Scraper for A Level Revision Cards, Revision Bank Scraper for O Level Revision Cards, Revision Bank Scraper for GCSE Revision Cards, Revision Bank Scraper for IB Revision Cards, Revision Bank Scraper for A Level Revision Practice Papers, Revision Bank Scraper for O Level Revision Practice Papers, Revision Bank Scraper for GCSE Revision Practice Papers, Revision Bank Scraper for IB Revision Practice Papers, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB"
        />
        </Helmet>
        <HeaderComponent/>
        <TopSection/>
        <AboutSection/>
        <InfoSection/>
        <Policies marginTop="-60px" marginTopPh ="-80px"/>



    
        
    </div>
    )
}