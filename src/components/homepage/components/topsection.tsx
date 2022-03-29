import team from './team.svg'
import Infographic from './AMARI_INFO.png'
import { useNavigate } from 'react-router-dom'
import './topsection.css'
export default function TopSection(){
  const navigate = useNavigate();
  //<button  className="btn documentation_btn">documentation</button>
    return(
      <section className="wrapper">
        <div className="container">
          <div className="grid-cols-2">
            <div className="grid-item-1">
              <h1 style={{color: "white"}} className="main-heading">
                Welcome to <span>Revision Bank.</span>
                <br />
                Study Easier.
              </h1>
              <p className="info-text">
                Speed up your academic revision with flexible and dynamic tools.
              </p>
  
              <div className="btn_wrapper">
                <button onClick={() => {navigate('/revisionbanktools')}} className="btn view_more_btn">
                  RevisionBanks <i className="ri-arrow-right-line"></i>
                </button>
                <button onClick={() => {navigate('/signup',{state:{"subscription":"freetrial"}})}} className="btn view_more_btn">
                  Try Free trial<i className="ri-arrow-right-line"></i>
                </button>                
              </div>
            </div>
            <div className="grid-item-2">
              <div className="team_img_wrapper">
                <img src={Infographic} alt="team-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}