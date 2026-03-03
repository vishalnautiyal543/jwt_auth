import mongoose from "mongoose"


const connectDB =async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(conn.connection.host);
        console.log("MongoDB connected successfully ✅");
        
        
    } catch (error) {
        console.log("mongodb connection error- db.js : ",error); 
        process.exit(1); 
    }
}

export {connectDB}