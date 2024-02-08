import admin from 'firebase-admin';

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clinic-fbf11-default-rtdb.europe-west1.firebasedatabase.app"
});
export const db = admin.database(); // Export the Firebase Realtime Database instance

export default admin;
