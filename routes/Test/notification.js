import firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  });
  const messaging = firebase.messaging();
  messaging.onTokenRefresh(async () => {
    const token = await messaging.getToken();
    console.log(token);
  });
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  });
};
export const getPermissionForNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    return token;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteToken = (token) => {
  const messaging = firebase.messaging();
  messaging.deleteToken(token);
  console.log('Token deleted.');
};
