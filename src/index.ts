import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "../config";
import cors from "cors"
import {routes} from './routes/routes'
import path from "path"; 

const app = express();


 app.use(express.json());
 app.use(cors(({ origin:'https://clinic-whnd.onrender.com'})));
 app.use(bodyParser.json());
 app.use(express.static(path.join(__dirname, "build")));

 app.use('/api', routes)
 app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
app.listen(config.port, () => {
});
