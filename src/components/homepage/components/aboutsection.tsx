import './aboutsection.css';
export default function AboutSection() {

    return(
        <section className="wrapper">
        <div className="container" data-aos="fade-up" data-aos-duration="1000">
            <div className="grid-cols-title">
            <h1>Welcome To RevisionBank</h1>
            </div>
        </div>
        <div style={{marginTop:"20px"}} className="container" data-aos="fade-up" data-aos-duration="1000">
            <p className='about-text'>
            RevisionBank was founded with the goal to add convenience to your revision and notetaking. Create revision cards and personal notes, accompanied with images and gifs. Then schedule them to be sent straight to your email. Your cards can be scheduled to be sent every minute,day,week and month. 
            Implementing the use of the well researched active recall methods. Revision cards and notes can also be shared with other users using a revisionbank link url, allowing them to review and revise the same material. 
            
            </p>
               
        
        
            
          
        </div>
      </section>

    )
}