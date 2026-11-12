import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
  })
);
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => {
  res.json({
    name: 'Babu Mohan Portfolio Concept API',
    notice: 'INDEPENDENT WEBSITE CONCEPT – FOR PRESENTATION PURPOSES ONLY',
    endpoints: ['/api/health', '/api/bootstrap', '/api/movies', '/api/timeline', '/api/awards', '/api/gallery', '/api/media', '/api/enquiries', '/api/upload'],
  });
});

app.use('/api', apiRouter);

connectDatabase().finally(() => {
  app.listen(PORT, () => {
    console.log(`[API] Server listening on port ${PORT}`);
  });
});

