
import './infosection.css';
export default function InfoSection(){
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
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="featured_info">
            <span>Several Exam Boards </span>
            <p>
              Explore the various exam boards and their respective, papers to aid your academic journies.
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
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="featured_info">
            <span>Physics, Biology and Chemistry</span>
            <p>
              A wide range of papers availaby for each of the AS and A Level science subjects.
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
            <span>Further Maths/Maths A Level</span>
            <p>
              Providing Further Maths Solution Banks, question papers 
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
}