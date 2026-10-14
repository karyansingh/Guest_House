import "../assets/css/Login.css";
import { useNavigate } from "react-router-dom"
import aiimsLogo from "../assets/images/aiimsheaderbluenew.png";
import aiimsCampus from "../assets/images/aiimsCampus.jpg";
import loginBuilding from "../assets/images/loginBuilding.png";
import LoginComponent from '../components/Login/LoginComponent'


function LandingPage () {
  const navigate = useNavigate()
  function handelRegistration(){
     navigate('/registration')
  }

  return (
    <div className="login-page">

      {/* LEFT SECTION */}
      <section className="login-left">

        <div className="left-overlay">

          <div className="institute-logo">
            <img src={aiimsLogo} alt="AIIMS Guwahati Logo" />
          </div>

          <div className="institute-name">
            <h1>AIIMS GUWAHATI</h1>

            <h3>
              ALL INDIA INSTITUTE OF MEDICAL SCIENCES
            </h3>

            <p>
              अखिल भारतीय आयुर्विज्ञान संस्थान, गुवाहाटी
            </p>
          </div>

          <div className="campus-wrapper">
            <img
              src={aiimsCampus}
              alt="AIIMS Guwahati Campus"
              className="campus-image"
            />
          </div>

          <div className="values">

            <div className="value-item">
                <span>✧</span>
                    <p>Excellence</p>
                </div>

                <div className="value-item">
                <span>♡</span>
                <p>Compassion</p>
                </div>

                <div className="value-item">
                <span>✦</span>
                <p>Innovation</p>
                </div>

                <div className="value-item">
                <span>◈</span>
                <p>Integrity</p>
                </div>

          </div>

          <div className="tagline">
            Healthcare • Education • Research
            <br />
            for a healthier tomorrow
          </div>

        </div>

      </section>


      {/* RIGHT SECTION */}
      <section className="login-right">

        <div className="login-card">

          <div className="login-header">

            <h2>
              Guest House Accommodation  
            </h2>

            <p>
              Please sign in to continue
            </p>

          </div>


          <div className="building-image">

            <img
              src={loginBuilding}
              alt="AIIMS Guwahati"
            />

          </div>

            <LoginComponent />  
    
            <br/><br/>      

          {/* FOOTER */}
        <div className="login-footer">

            <span style={{cursor:'pointer'}} onClick={handelRegistration}>
              👨🏽‍✈️ Registration
            </span>

            <span>
              © AIIMS Guwahati. All rights reserved.
            </span>

        </div>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;