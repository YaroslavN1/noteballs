import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDTY8Tz0wPWVB8wtYdMqVLZyGAXtIqiHGg',
  authDomain: 'noteballs-18d84.firebaseapp.com',
  projectId: 'noteballs-18d84',
  storageBucket: 'noteballs-18d84.appspot.com',
  messagingSenderId: '999287949420',
  appId: '1:999287949420:web:90510103385fed416eb049'
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}