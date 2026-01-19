import express from 'express';
import cors from 'cors';
import { initDatabase } from './database.js';
import gestureRoutes from './routes/gestures.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gestures', gestureRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
