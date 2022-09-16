import 'express-async-errors';
import express from 'express';
import globalError from './helpers/GlobalError';
import router from './routes';

const app = express();
app.use(express.json());
app.use(router);
app.use(globalError);

export default app;
