import express from "express"
import {globalErrorHandler} from "./middlewares/globalErrorHandler.js"
import dotenv from "dotenv"



// dotenv config
dotenv.config({path:"./.env"})


const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// import routes
import userRoute from "./routes/user.route.js"

app.use("/api",userRoute)


//global error handler
app.use(globalErrorHandler);

export {app}