import express, { json } from 'express';

import { routes } from './routes';

const app = express();

app.use(json());
app.use(routes);


app.listen(3000, () => {
    console.log('Serve is running....');
});