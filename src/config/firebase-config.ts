import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Check if required environment variables are defined
const requiredEnvVariables = [
  'PROJECT_ID',
  'PRIVATE_KEY',
  'CLIENT_EMAIL',
  'CLIENT_ID',
  'AUTH_URI',
  'TOKEN_URI',
  'AUTH_PROVIDER_X509_CERT_URL',
  'CLIENT_X509_CERT_URL'
];

for (const envVar of requiredEnvVariables) {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is not defined.`);
  }
}

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.PROJECT_ID,
  private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, '\n'), 
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), 
  databaseURL: "https://clinic-fbf11-default-rtdb.europe-west1.firebasedatabase.app"
});

export const db = admin.database(); 
export default admin;
