import router from "./auth.js";

import Verify from "../middleware/verify.js";
import { Logout } from "../controllers/auth.js";

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
      const userId = req.user;
      res.json({ message: `Protected resource accessed by user ${userId}` });
    });
    
    
    server.use("/v1/auth", router);
    
    server.get('/logout', Logout);

    

  };
export default Router;
