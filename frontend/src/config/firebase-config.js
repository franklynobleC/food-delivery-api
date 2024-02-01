// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAhrgOWC_1tiN36ExptLlSQnMp4l13x4p0',
  authDomain: 'food-9ce21.firebaseapp.com',
  projectId: 'food-9ce21',
  storageBucket: 'food-9ce21.appspot.com',
  messagingSenderId: '563575151237',
  appId: '1:563575151237:web:b7295927dd40dc38cba7ec',
  measurementId: 'G-5P12E7XNFF'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
