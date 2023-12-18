
import { useState } from 'react';
import './infosection.css';
export default function InfoSection(){
    const [closeCookie,setCloseCookie] = useState("auto");
    return(
    <section className="wrapper">
    <div className="container" data-aos="fade-up" data-aos-duration="1000">
      <div className="grid-cols-3">
      <div className="grid-col-item">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="featured_info">
            <span>Revision Cards</span>
            <p>
            Create and schedule revision cards to be sent to your email. Revise on-the-go to improve efficiency and add provide convenience when revising for your AS Level and A Level exams.
            </p>
          </div>
        </div>

        <div className="grid-col-item">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="featured_info">
            <span>Schedule Revision Cards</span>
            <p>
              Struggle to remember something from a few months ago. Schedule Revisioncards to be sent to your email. Every day,week,month. Use them personal, for work or school. 
            </p>
          </div>
        </div>


        <div className="grid-col-item">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div className="featured_info">
            <span>Upload Images, GIFs and Share </span>
            <p>
              Upload images or GIFs to your revision cards and share them to your friends as a joke or for missing notes. Have a friend you need to remind for a project? Schedule cards to be sent to them.

            </p>
          </div>
        </div>
      </div>

    </div>
      
    <div className="cookie-banner" style={{"display":closeCookie}}>
    <p>
    We use cookies to ensure you have the best browsing experience on our website. By using our site, you acknowledge that you have read and understood our <a href="/cookiepolicy">Cookie Policy</a> & <a href="/privacypolicy">Privacy Policy</a>
      </p>
    <button style={{cursor:"pointer"}} color='black' className="close" onClick={() => setCloseCookie("none")}>&times;</button>
    </div>
  </section>
    )
}