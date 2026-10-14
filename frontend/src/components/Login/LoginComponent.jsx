import InputFormComponent from "../formik/InputFormComponent"
import { Input, IsErrorMessage, Butn } from "../inputs/InputComponent"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import useLoading from "../../hooks/useLoading"
import userAPI from "../../API/userAPI"
import apiHandler from "../../services/Axios"
import { loginValidation } from '../../validation/UserValidation'
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert'


function LoginComponent(){
    const initialValues={email:'', password:''}
    const { loading, callAPI } = useLoading()
    const navigate = useNavigate()

    async function handleSubmit(values){
        const data = {
            email: values.email,
            password: values.password,
        }
        const res = await callAPI(apiHandler.postAPI, false, userAPI.login , data)
        if(res.status===200){
            userAPI.userId = res.data.email
            console.log("ppppppppp:"+userAPI.userId)
            localStorage.setItem("tokenGHA", res.data.tokenGHA)
            navigate('/dashboard')
        } else if(res.status===500){
            swal(res.message, "", "error")
        }else{
            swal('Something went wrong', "", "error")
        }
    }
    return(
        <>
             <InputFormComponent initialValues={initialValues} validationSchema={loginValidation} handleSubmit={handleSubmit}>
                {() => (
                    <>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email"
                            icon=<FaUser style={{color:'#FF9F43'}}/>
                        />
                        <IsErrorMessage name="email" />

                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            icon=<RiLockPasswordFill style={{color:'#FF9F43'}}/>
                        />
                        <IsErrorMessage name="password" />

                        <div className="login-options">
                            <a href="#">
                                Forgot Password?
                            </a>
                        </div>
                        <Butn type="submit" isLoading={loading}>
                            Login
                        </Butn>
                    </>
                )}
            </InputFormComponent>
        </>
    )
}
        
export default LoginComponent