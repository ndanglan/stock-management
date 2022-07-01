import dotenv from "dotenv";

dotenv.config();



export default {
  serverConfig:{
    host:"localhost",
    port:process.env.NODE_ENV==='development'?process.env.PORT:5000,
    baseUri:"/api/v1",
  }
};