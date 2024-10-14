import Auth from "./auth.js";

import Verify from "../middleware/verify.js";
import authenticateToken from "../middleware/verify.js";

const Router = (server) => {
  // home route with the get method and a handler
  server.get("/v1", (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        data: [],
        message: "Welcome to our API homepage!",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  });
  
  
  
  server.get("/v1/user", Verify, (req, res) => {
      const userId = req.user.userId;
      res.json({ message: `Protected resource accessed by user ${userId}` });
    });

    
    server.use("/v1/auth", Auth);
  };
export default Router;
