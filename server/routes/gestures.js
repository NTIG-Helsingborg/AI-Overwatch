import express from 'express';
import {
  getAllGestures,
  getGesturesByDateRange,
  getGesturesByType,
  addGesture,
  deleteGesture,
  getGestureStats
} from '../database.js';

const router = express.Router();

// GET all gestures
router.get('/', (req, res) => {
  try {
    const gestures = getAllGestures();
    res.json(gestures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET gestures by date range
router.get('/date-range', (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end dates are required' });
    }
    const gestures = getGesturesByDateRange(start, end);
    res.json(gestures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET gestures by type
router.get('/type/:gestureType', (req, res) => {
  try {
    const { gestureType } = req.params;
    const gestures = getGesturesByType(gestureType);
    res.json(gestures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET gesture statistics
router.get('/stats', (req, res) => {
  try {
    const stats = getGestureStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new gesture
router.post('/', (req, res) => {
  try {
    const { gesture_type, confidence, metadata } = req.body;
    if (!gesture_type) {
      return res.status(400).json({ error: 'gesture_type is required' });
    }
    const id = addGesture(gesture_type, confidence || 1.0, metadata);
    res.status(201).json({ id, message: 'Gesture added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE gesture
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const changes = deleteGesture(id);
    if (changes === 0) {
      return res.status(404).json({ error: 'Gesture not found' });
    }
    res.json({ message: 'Gesture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
