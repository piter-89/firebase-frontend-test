import * as firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGPWHl-vOf47uCpCA059Yy8q6KS8IWD8s",
  authDomain: "only-test-be063.firebaseapp.com",
  databaseURL: "https://only-test-be063.firebaseio.com",
  projectId: "only-test-be063",
  storageBucket: "only-test-be063.appspot.com",
  messagingSenderId: "404381393205",
  appId: "1:404381393205:web:c567b674ec956256592c7c"
}

firebase.initializeApp(firebaseConfig);

export default {
  firebase
}