import InputFormComponent from "../formik/InputFormComponent"
import { Input, IsErrorMessage, Butn } from "../inputs/InputComponent"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import useLoading from "../../hooks/useLoading"
import userAPI from "../../API/userAPI"
import apiHandler from "../../services/Axios"
import { registrationValidation } from '../../validation/UserValidation'
import swal from 'sweetalert'


function RegistrationComponent(){
    const initialValues={name:'', email:'', designation:'',  password:'', confirm_password:''}
    const { loading, callAPI } = useLoading()

    async function handleSubmit(values, { resetForm }){
         const data = {
            name: values.name,
            email: values.email,
            designation:values.designation,
            password: values.password,
        }
        const res = await callAPI(apiHandler.postAPI, false, userAPI.registration, data)
        if(res.status===200){
            swal(res.data, "", "success")
             resetForm()
        } else if(res.status===500){
            swal(res.message, "", "error")
        }else{
            swal('Something went wrong', "", "error")
        }
    }
    return(
        <>
        <InputFormComponent initialValues={initialValues} validationSchema={registrationValidation} handleSubmit={handleSubmit}>
            {() => (
                <>
                    <Input
                        label="Name:"
                        type="text"
                        name="name"
                        placeholder="Name"
                        icon=<FaUser style={{color:'#FF9F43'}}/>
                    />
                    <IsErrorMessage name="name" />

                    <Input
                        label="Email:"
                        type="text"
                        name="email"
                        placeholder="Email"
                        icon=<MdEmail style={{color:'#FF9F43'}}/>
                    />
                    <IsErrorMessage name="email" />

                    <Input
                        label="Designation:"
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        icon=<AiFillCheckCircle style={{color:'#FF9F43'}}/>
                    />
                    <IsErrorMessage name="designation" />
        
                    <Input
                        label="Password:"
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon=<RiLockPasswordFill style={{color:'#FF9F43'}}/>
                    />
                    <IsErrorMessage name="password" />

                    <Input
                        label="Confirm password:"
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm password"
                        icon=<RiLockPasswordFill style={{color:'#FF9F43'}}/>
                    />
                    <IsErrorMessage name="confirm_password" />
        
                    
                    <Butn type="submit" isLoading={loading}>
                        Registration
                    </Butn>
                </>
            )}
            </InputFormComponent>
        </>
    )
}
export default RegistrationComponent