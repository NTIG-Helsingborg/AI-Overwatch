// Example usage of the gesture API
const API_BASE_URL = 'http://localhost:3000/api';

// Add a new gesture
export async function recordGesture(gestureType, confidence = 1.0, metadata = null) {
  const response = await fetch(`${API_BASE_URL}/gestures`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gesture_type: gestureType,
      confidence,
      metadata
    })
  });
  return response.json();
}

// Get all gestures
export async function getAllGestures() {
  const response = await fetch(`${API_BASE_URL}/gestures`);
  return response.json();
}

// Get gestures by date range
export async function getGesturesByDateRange(startDate, endDate) {
  const response = await fetch(
    `${API_BASE_URL}/gestures/date-range?start=${startDate}&end=${endDate}`
  );
  return response.json();
}

// Get gestures by type
export async function getGesturesByType(gestureType) {
  const response = await fetch(`${API_BASE_URL}/gestures/type/${gestureType}`);
  return response.json();
}

// Get gesture statistics
export async function getGestureStats() {
  const response = await fetch(`${API_BASE_URL}/gestures/stats`);
  return response.json();
}

// Delete a gesture
export async function deleteGesture(id) {
  const response = await fetch(`${API_BASE_URL}/gestures/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}
