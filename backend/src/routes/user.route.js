import { Router } from "express";
import { registerUser, loginUser} from "../controllers/users.contriller.js";
import { validateRegistration } from '../validation/userValidation.js'

const userRouter = Router();

// POST
userRouter.route("/registration").post(validateRegistration, registerUser)
userRouter.route("/login").post(loginUser)

export default userRouter;