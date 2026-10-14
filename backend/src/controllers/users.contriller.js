import { asyncHandler } from "../utilitys/async.handler.utils.js";
import { sendResponse } from "../utilitys/response.utils.js";
import globalModel from "../model/index.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from '../utilitys/jwt.js'

// export const insertData = asyncHandler(async (req, res) => {
//     const result = await globalModel.executeTransaction(
//         async (connection) => {

//             const tableNameAdmin="admin"
//             const valuesAdmin={
//                  name: "Papu",
//             }
//             const admin = await globalModel.insert(
//                 tableNameAdmin,
//                 valuesAdmin,
//                 connection
//             );


//             if (!admin.success) {
//                 sendResponse(res, null, 500, admin.error) 
//                 //throw new Error(admin.error);
//             }


//             const tableNameUsers="users"
//             const valuesUsers={
//                  name: "Papu",
//                  "email":"papu@gmail.com"
//             }
//             const user = await globalModel.insert(
//                 tableNameUsers,
//                 valuesUsers,
//                 connection
//             );

           

//             if (!user.success) {
//                 sendResponse(res, null, 500,user.error)
//                 //throw new Error(user.error);
//             }

            
//             const tableNameUpdateUser="users"
//             const valuesUpdateUser={
//                 name:"John"
//             }

//             const filterUpdateuser={
//                 id:22
//             }
//             const userUpdate = await globalModel.update(
//                 tableNameUpdateUser,
//                 valuesUpdateUser,    
//                 filterUpdateuser,
//                 connection
//             );

//             if(!userUpdate.success){
//                  sendResponse(res, null, 500,user.error)
//             }


//             const tableNameUserDelete="admin"
//             const filterUserDelete={
//                     id: 18
//             }
//             const userDelete = await globalModel.delete(
//                 tableNameUserDelete,
//                 filterUserDelete,
//                 connection
//             );

//             if (!userDelete.success) {
//                 sendResponse(res, null, 500,userDelete.error)
//             }

//             sendResponse(res, "Success")
//         }
//     );
// })

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, designation, password }=req.body
    const tableName="users"
    
    const valuesRegistration={
        name: name,
        email:email,
        designation:designation,
        password: await bcrypt.hash(password,10),
        role:'Staff'
    }
    const register = await globalModel.insert(
        tableName,
        valuesRegistration,
    );

    if(register.success){
        sendResponse(res, "Registration success")
    }

    sendResponse(res, null, 500, register.error)
    
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password }=req.body
    const page = req.query.page || 1;
    let isMatch=false

    const columns = ["name", "email", "designation", "password", "role"];
    const filter = {
        email: email,
    };
    const tableName = "users";
   
    const user = await globalModel.select(
        tableName,
        columns,
        filter,
        "user_id",
        "ASC",
        page,
        1
    );

    if(user.status===200){
       
        const userDetail=user?.data?.[0];
        const passwordHash=userDetail?.password;
        isMatch = await bcrypt.compare(password, passwordHash);
        if(isMatch){
            delete(userDetail?.password)
            const token= generateAccessToken(userDetail?.user_id, userDetail?.email, userDetail?.role,  process.env.APPLICATION_Id,)
            console.log(userDetail)
            userDetail.tokenGHA=token
            sendResponse(res, userDetail)
        }else{
            sendResponse(res, null, 500, 'Invalide password') 
        }
    }else{
        sendResponse(res, null, 500, 'Invalide email')
    }    
    
})