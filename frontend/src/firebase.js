import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCeNLRBDeSHQO0oRjD0b0pvDfKxJdCCEEg",
  authDomain: "test-push-d351e.firebaseapp.com",
  projectId: "test-push-d351e",
  storageBucket: "test-push-d351e.appspot.com",
  messagingSenderId: "910699046271",
  appId: "1:910699046271:web:c512487328496a11daa64a",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
