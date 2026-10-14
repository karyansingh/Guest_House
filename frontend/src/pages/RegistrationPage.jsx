import '../assets/css/registration.css'
import RegistrationComponent from '../components/Login/RegistrationComponent'
import { useNavigate } from "react-router-dom"
function RegistrationPage(){
    const navigate = useNavigate()
    function handelLogin(){
        navigate('/')
    }
    return(
        <div className="login-page">
            <div className="registration-containner">
                <div style={{paddingLeft:'40px', color:'#173d70'}}>
                    <div style={{fontSize:'2rem', fontWeight:'600'}}>Registration</div>
                    <div style={{paddingBottom:'10px', color:'#787777'}}>Create your account for login</div>
                </div>        
                <RegistrationComponent/>
                <br/>
                <div style={{ color:'#173d70', textAlign:'center', cursor:'pointer'}} onClick={handelLogin}>
                    Login   
                </div>  
            </div>
        </div>
    )
}

export default RegistrationPage