import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI } from "./config/index.js";
import Router from "./routes/index.js";


const server = express();

server.use(cors());

// We used it after we have to deal with session  
server.use(cookieParser());

//We used the below line when the user have to fill the form using html

server.use(express.urlencoded({ extended: false }));

// It Will Parse the Json request body

server.use(express.json());

// CONNECT DATABASE

main().catch(err => console.log(err));


async function main() {
  await mongoose.connect(URI);

}

Router(server);

server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
