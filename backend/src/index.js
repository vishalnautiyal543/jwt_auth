import { app } from "./app.js";
import {connectDB} from "./db/db.js"


const port = process.env.PORT


//connect db
connectDB()
.then(()=>{
    app.listen(5000, () => {
  console.log(`Server running on http://localhost:${port}`);
});
})
.catch((error)=>{
    console.log("mongodb connection error - index", error);
})
