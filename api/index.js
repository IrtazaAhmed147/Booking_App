import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/user.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config()

const connect = async () => {


    try {
        await mongoose.connect(process.env.MONGO);
        console.log("COnnect to mongo db");
        
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected");
})
mongoose.connection.on("connected", ()=> {
    console.log("mongoDB connected");
})

// middleware



// ✅ CORS FIX
const allowedOrigins = [
  "http://localhost:3000",
  "https://bookingappclientside.vercel.app"
];

// ✅ Unified CORS + Preflight Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }

  // ✅ Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});




// ✅ Manual header override (Railway sometimes strips headers)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  }
  next();
});



app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/room", roomsRoute)

app.use((err, req, res, next)=> {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"   
return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,

})
})

app.listen(8800, () => {
    connect()
    console.log("Server is listening at port 8800");

})