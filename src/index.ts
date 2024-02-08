import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "../config";
import cors from "cors"
import {routes} from './routes/routes'
const app = express();

 app.use(express.json());
 app.use(cors(({ origin:'https://clinic-whnd.onrender.com'})));
 app.use(bodyParser.json());

 app.use('/api', routes)

app.listen(config.port, () => {
});
