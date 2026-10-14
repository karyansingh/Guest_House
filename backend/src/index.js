import express from "express";
//import bodyParser from "body-parser";
import cors from "cors";
import { adminRouter, userRouter, authenticationRouter } from "./routes/index.js";
import pool from "../src/db/config.js";
//import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares/tokenMiddleware.js";
import { sanitize } from "./middlewares/sanitize.js";
//import connectDB from "./database/index.js";

import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const app = express();

//app.use(cookieParser());

const allowedOrigins = [
    "http://10.1.24.75:5173"
];

// cors setup
const corsOptions = {
    origin: (origin, callback) => {

        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error("Origin not allowed"));
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
        "X-Requested-With",
        "X-Amz-Date",
        "X-Api-Key",
        "X-Amz-Security-Token"
    ]
};

app.use(cors(corsOptions));
//app.options("*", cors(corsOptions));

// Setups
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(sanitize)

// Routes

app.use("/API/auth", verifyToken(["nodal_officer", "department"]), authenticationRouter);

//app.use("/API/auth", authenticationRouter);

app.use("/API/user", userRouter);
// app.use("/API/super-admin", superadminRouter);
app.use("/API/admin", adminRouter);
// app.use("/API/seller", sellerRouter);
// app.use("/API/agent", agentRouter);

console.clear();

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port: ${process.env.PORT}`)
})
