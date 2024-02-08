import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "../config";
import cors from "cors"
import {routes} from './routes/users'
const app = express();

 app.use(express.json());
 app.use(cors());
 app.use(bodyParser.json());

 app.use('/api', routes)

app.listen(config.port, () => {
});
