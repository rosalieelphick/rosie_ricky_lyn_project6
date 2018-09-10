import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCTO-Xs0i3Chvh5p5kJ9l6dAha-DlYthXU",
    authDomain: "robot-trivia-359f6.firebaseapp.com",
    databaseURL: "https://robot-trivia-359f6.firebaseio.com",
    projectId: "robot-trivia-359f6",
    storageBucket: "",
    messagingSenderId: "114905947304"
};

firebase.initializeApp(config);

export default firebase;