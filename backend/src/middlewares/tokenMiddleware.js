
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

export const verifyToken = (roles = []) => {
    return (req, res, next) => {

        const token =
            req.cookies?.accessToken ||
            req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        try {

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const { email } = req.query;
            const tokenEmail = decoded.email;
            const API = req.originalUrl
            const method = req.method

            if (API === '/API/auth/auth' && method == 'GET') {
                console.log("Auththontication")
            } 
            //else if(API === '/API/user/forgot-password-change' && method == 'POST'){
            //     console.log("Auththontication")
            //}
            else {
                if (email !== tokenEmail) {
                    return res.status(403).json({ message: "Access denied." });
                }
            }

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            
            req.user = decoded;
            next();

        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.status(403).json({ message: "Invalid or expired token." });
        }
    };
};