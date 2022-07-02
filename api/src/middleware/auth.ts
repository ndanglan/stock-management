// import jwt from "jsonwebtoken";
// import { Unauthenticated } from "../errors";
// import { Request,Response,NextFunction } from "express";
// import User from "../models/User";

// const auth = (req:Request & any,res:Response,next:NextFunction)=>{
//   const authHeader = req.headers.authorization;

//   if(!authHeader || !authHeader.startsWith('Bearer')){
//     throw new Unauthenticated('Authentication invalid!!!');
//   }

//   const token = authHeader.split(' ')[1];
//   if(process.env.JWT_SECRET){
//     try {
//       const payload = jwt.verify(token,process.env.JWT_SECRET) as jwt.JwtPayload
//       const user = User.findById(payload.id).select('-password');
//       req.user =user;
//       req.user = {userId:payload.userId,name:payload.username};
//       next();
//     } catch (error) {
//         throw new Unauthenticated("Authentication invalid");
//     }
//   }
// }

// export default auth;
