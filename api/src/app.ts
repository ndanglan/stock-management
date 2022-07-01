import express from "express";
import config from 'config'
import morgan from "morgan";
import route from './routes'
import cors from 'cors';

// env
const port = config.get("serverConfig.port" );
const host = config.get("serverConfig.host");

const app = express();

// static
app.use(express.urlencoded({
   extended:true
}));
app.use(express.json());
app.use(cors())

//HTTP logger
app.use(morgan("combined"));

// routes
route(app);

app.listen(port,()=>console.log(`Example app listening at http://${host}:${port}`));

