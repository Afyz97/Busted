import * as firebase from 'firebase';

  let config = {
    apiKey: "AIzaSyCMvXnWL-sZdzfKZeuAauEY-x33x42pC7E",
    authDomain: "samantreck.firebaseapp.com",
    databaseURL: "https://samantreck.firebaseio.com",
    projectId: "samantreck",
    storageBucket: "samantreck.appspot.com",
    messagingSenderId: "714396663090",
    appId: "1:714396663090:web:938104d65c9e14587aab2b",
    measurementId: "G-EDENZKNXQT"
  };
let app = firebase.initializeApp(config);
export const db = app.database();


