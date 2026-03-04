import express from "express"
import {globalErrorHandler} from "./middlewares/globalErrorHandler.js"
import dotenv from "dotenv"
import cors from "cors"




// dotenv config
dotenv.config({path:"./.env"})


const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)



// import routes
import userRoute from "./routes/user.route.js"

app.use("/api",userRoute)


//global error handler
app.use(globalErrorHandler);

export {app}