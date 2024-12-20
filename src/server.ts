import express, { json } from 'express';
import cors from "cors"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { routes } from './routes';

const options: cors.CorsOptions = {
    allowedHeaders: '*',
    origin: '*',
}
const app = express();
app.use(cors(options))
app.use(json());
app.use(routes);


app.listen(3000, () => {
    console.log('Serve is running....');
});