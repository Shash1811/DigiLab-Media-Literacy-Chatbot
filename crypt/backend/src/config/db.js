const admin = require('firebase-admin');

let db;

const initializeFirebase = () => {
    try {
        if (admin.apps.length > 0) {
            db = admin.firestore();
            console.log('Firebase already initialized');
            return db;
        }

        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
            console.warn('Firebase environment variables missing. Persistence will be disabled.');
            return null;
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n')
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
        });

        db = admin.firestore();
        console.log('Firebase initialized successfully');
        return db;

    } catch (error) {
        console.error(`Firebase initialization error: ${error.message}`);
        // Don't exit process, allow server to run for other tasks
        return null;
    }
};

const getFirestore = () => {
    if (!db) {
        initializeFirebase();
    }
    return db;
};

module.exports = { initializeFirebase, getFirestore };
