import { memo, useState, useEffect } from "react"
import apiHandler from "../services/Axios"
import userAPI from "../API/userAPI"
import useLoading from "../hooks/useLoading"
import useRedux from "../hooks/useRedux"
import { users } from '../store/slices/UserSlice'
import loader from '../../src/assets/images/loading-loader.gif'

const ProtectedRoute = ({ children, component }) => {
    const [auth, setAuth] = useState(null)
    const { callAPI } = useLoading()
    const { dispatchValue } = useRedux()
    useEffect(() => {
        ;(async () => {
            const res = await callAPI(apiHandler.getAPI, true, userAPI.auth)
            const { email, role, token, applicationId, accessPages  } = res
            

            userAPI.accessRole = role
            userAPI.userId = email
            userAPI.token = token
            userAPI.applicationId=applicationId
            userAPI.accessPage=accessPages
            delete(res.token)
            delete(res.applicationId)
            delete(res.accessPages)
            dispatchValue(users(res))
            setAuth(role)
        })()
    }, [auth])
    
     if (auth == null) {
        return <div
            style={{
                position: "fixed",       // <-- key fix
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)", // subtle overlay
                color: "#090909",
                zIndex: 9999,
            }}>
            <img style={{ width: '100px' }} src={loader} />
        </div>
    } else {
        if (userAPI.accessPage?.includes(component)) {
            return children
        } else {
            return <div className="error" style={{ textAlign: 'center', padding: '20px' }}>
                Access Denied: You don’t have permission.
                <br />
                <span><Link to="/">Back</Link></span>
            </div>
        }
    }
    //return children
}
export default memo(ProtectedRoute);