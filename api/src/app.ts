import express from "express";
import config from 'config'
import morgan from "morgan";
import path from "path";
import route from './routes'

// env
const port = config.get("serverConfig.port" );
const host = config.get("serverConfig.host");

const app = express();

// static
app.use(express.urlencoded({
   extended:true
}));
app.use(express.json());

//HTTP logger
app.use(morgan("combined"));

// routes
route(app);

app.listen(port,()=>console.log(`Example app listening at http://${host}:${port}`));

