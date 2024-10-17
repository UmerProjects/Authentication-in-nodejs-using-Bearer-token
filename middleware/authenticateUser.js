import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { SECRET_ACCESS_TOKEN } from "../config/index.js";
import { getLatestToken } from "../controllers/auth.js";
import blacklist from "../models/blacklist.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid." });
  }

  const tokenbyUser = authHeader.split(" ")[1];
  console.log(tokenbyUser);

  //function when we logout

  const checkIfBlacklisted = await blacklist.findOne({ token: tokenbyUser });
  if (checkIfBlacklisted)
    return res
      .status(401)
      .json({ message: "This session has expired. Please login again  " });

  try {
    const decoded = jwt.verify(tokenbyUser, SECRET_ACCESS_TOKEN);
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// export const displaythePostM = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ message: "Authorization header missing or invalid." });
//   }

//   const tokenbyUser = authHeader.split(" ")[1];
//   console.log(tokenbyUser);

//   const checkIfBlacklisted = await blacklist.findOne({ token: tokenbyUser });
//   if (checkIfBlacklisted)
//     return res
//       .status(401)
//       .json({ message: "This session has expired. Please login again  " });

//   try {
//     const decoded = jwt.verify(tokenbyUser, SECRET_ACCESS_TOKEN); 
//     console.log(decoded);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

    

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token." });
//   }
// };


