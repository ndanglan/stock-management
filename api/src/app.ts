import express from 'express';
import config from 'config';
import morgan from 'morgan';
import { authRouter } from './routes';
import cors from 'cors';
import errorHandlerMiddleware from './middleware/error-handler';
import { notFound } from './middleware';

// env
const port = config.get('serverConfig.port');
const host = config.get('serverConfig.host');
const baseUri = config.get<string>('serverConfig.baseUri');

const app = express();

// static
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(cors());

//HTTP logger
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('<h1>Stock management api</h1>');
});

app.use(`${baseUri}/auth`, authRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

app.listen(port, () => console.log(`Example app listening at http://${host}:${port}`));
