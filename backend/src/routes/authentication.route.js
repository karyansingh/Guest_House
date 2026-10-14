import { Router } from "express"
import jwt from "jsonwebtoken"
import { dashboardRoutes } from "../routes/frontEndDashboardRoutes.route.js"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const authenticationRouter = Router()

authenticationRouter.route("/auth").get((req, res) => {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const accessPages = dashboardRoutes.filter(route => route.roles.includes(decoded.role)).map(route => route.component);

    const userDetails = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        applicationId:decoded.applicationId,
        token,
        accessPages
    }
    res.status(200).json(userDetails)
})
export default authenticationRouter