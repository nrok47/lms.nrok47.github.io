import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const allPresent = Object.values(cfg).every((v) => typeof v === 'string' && v.length > 0);

let app = null;
let db = null;
let analytics = null;

try {
  if (allPresent) {
    app = initializeApp(cfg);
    db = getFirestore(app);
    
    // Initialize Analytics only in browser environment
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
    
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('[Firebase] Missing config. Skipping initialization. Provide VITE_FIREBASE_* env vars.');
  }
} catch (err) {
  console.error('[Firebase] Initialization error:', err);
}

export { app, db, analytics };
