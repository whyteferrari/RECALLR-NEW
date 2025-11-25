// API Configuration
// ==================

// 🔧 UPDATE THIS URL after deploying to Render
const BACKEND_URL = 'https://recallr-new.onrender.com/'; // Change to your Render URL: 'https://recallr-backend.onrender.com'

// Detect if we're in development (localhost) or production
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname.includes('192.168');

// Use localhost for development, Render URL for production
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3000'  // Local development
  : 'https://funny-syrniki-4806f1.netlify.app/';  // 🔧 UPDATE THIS after deployment

// Export configuration
const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    // Auth
    SIGNUP: `${API_BASE_URL}/api/signup`,
    LOGIN: `${API_BASE_URL}/api/login`,
    
    // Decks
    DECKS: `${API_BASE_URL}/api/decks`,
    GET_DECKS: (userId) => `${API_BASE_URL}/api/decks/${userId}`,
    GET_DECK_DETAIL: (deckId) => `${API_BASE_URL}/api/decks/${deckId}/detail`,
    UPDATE_DECK: (deckId) => `${API_BASE_URL}/api/decks/${deckId}`,
    ARCHIVE_DECK: (deckId) => `${API_BASE_URL}/api/decks/${deckId}/archive`,
    RECOVER_DECK: (deckId) => `${API_BASE_URL}/api/decks/${deckId}/recover`,
    DELETE_DECK: (deckId) => `${API_BASE_URL}/api/decks/${deckId}`,
    
    // Flashcards
    GET_FLASHCARDS: (deckId) => `${API_BASE_URL}/api/decks/${deckId}/flashcards`,
    ADD_FLASHCARD: (deckId) => `${API_BASE_URL}/api/decks/${deckId}/flashcards`,
    BULK_FLASHCARDS: (deckId) => `${API_BASE_URL}/api/decks/${deckId}/flashcards/bulk`,
    GET_ALL_FLASHCARDS: (userId) => `${API_BASE_URL}/api/flashcards/${userId}`,
    
    // Folders
    GET_FOLDERS: (userId) => `${API_BASE_URL}/api/folders/${userId}`,
    
    // Tasks
    GET_TASKS: (userId) => `${API_BASE_URL}/api/user/${userId}/tasks`,
    ADD_TASK: (userId) => `${API_BASE_URL}/api/user/${userId}/tasks`,
    UPDATE_TASK: (userId, taskId) => `${API_BASE_URL}/api/user/${userId}/tasks/${taskId}`,
    DELETE_TASK: (userId, taskId) => `${API_BASE_URL}/api/user/${userId}/tasks/${taskId}`,
    
    // Ongoing Decks
    GET_ONGOING_DECKS: (userId) => `${API_BASE_URL}/api/user/${userId}/ongoing-decks`,
  }
};

// Helper function to check if user is logged in
function checkAuth() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Please login first.');
    window.location.href = 'login.html';
    return null;
  }
  return userId;
}

// Helper function for API calls with error handling
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'API request failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}

// Log current configuration
console.log('🔧 API Configuration:', {
  environment: isDevelopment ? 'Development' : 'Production',
  baseURL: API_BASE_URL,
  hostname: window.location.hostname
});