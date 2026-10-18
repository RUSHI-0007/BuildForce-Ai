/**
 * @file app.js
 * Builds the Express application, registers middleware and routes.
 */
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'BuildForce API' });
});

export default app;
