import { Hono } from 'hono';
import studentsRouter from './routes/students.js';

const app = new Hono();

app.route('/', studentsRouter);

export default app;