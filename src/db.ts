import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import config from '../config';
import admin from 'firebase-admin'
const db = firebase.initializeApp(config.firebaseConfig);

export default db;
