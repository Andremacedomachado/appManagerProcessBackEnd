import express, { json } from 'express';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { routes } from './routes';

const app = express();

app.use(json());
app.use(routes);


app.listen(3000, () => {
    console.log('Serve is running....');
});