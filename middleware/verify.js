import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../config/index.js";
import blacklist from "../models/blacklist.js";
import {getLatestToken} from "../controllers/auth.js";


export default async function Verify(req, res, next) {

  try {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.sendStatus(401); // Unauthorized
    }
    
    
    const bearerToken = authHeader.split(" ")[1]; 
    console.log(bearerToken); 

    //function when we logout

    const checkIfBlacklisted = await blacklist.findOne({ token: bearerToken }); 
    if (checkIfBlacklisted)
        return res
            .status(401)
            .json({ message: "This session has expired. Please login again  " });

    // const token = authHeader.split(" ")[1];
    // console.log(token);

    // console.log(SECRET_ACCESS_TOKEN);


    jwt.verify(bearerToken, SECRET_ACCESS_TOKEN, async (err, decoded) => {
      console.log("Decoded JWT:", decoded);


      if (err) {
        return res.status(401).json({
          message: "This session has expired. Please log in. ",
        });
      }

      if (!decoded) {
        return res.status(401).json({ message: "Invalid token." });
      }

      const { id } = decoded;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const { password, ...data } = user._doc;

      req.user = data.first_name;
      console.log(req.user);
      next();
    });
  } catch (err) {
    console.error("Error in token verification:", err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
}
