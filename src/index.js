import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bearer from 'express-bearer-token';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Utils
import connectDatabase from './utils/connectDatabase.js';

// Controllers
import restaurantsController from './controllers/restaurants.js';

dotenv.config();

const port = process.env.PORT || 8080;

await connectDatabase();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bearer());
app.use(helmet());
app.use(cors());

// Rest API endpoints
app.use('/api/v1/restaurants', restaurantsController);

// API 404
app.use('/api/*', (_, res) => res.status(404).json({
  error: true,
  message: "Not found"
}))

// React content
app.use((_, res) => res.sendFile('index.html', {root: '../pizza/build/'}));
app.use('/', express.static('../pizza/build/'));

app.listen(port, () => {
  console.log('🍔 API running')
});