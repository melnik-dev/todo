// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqQ_RVgXvp_YaoEJpwkQhK5FOcL9KrJj8",
    authDomain: "todos-5499c.firebaseapp.com",
    databaseURL: "https://todos-5499c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todos-5499c",
    storageBucket: "todos-5499c.appspot.com",
    messagingSenderId: "151000102166",
    appId: "1:151000102166:web:3996d49d489e0d4bf9cc37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function writeListData(tasks) {
    set(ref(database, 'todolist/'), tasks)
        .then(() => {
        // Data saved successfully!
            console.log('database send')
    })
        .catch((error) => {
            // The write failed...
            console.log(error)
        });
}

function getListData(tasks) {
    const starCountRef = ref(database, 'todolist/');
    onValue(starCountRef, (snapshot) => {
        tasks = snapshot.val();
        console.log(tasks);
    });
}

function removeListData() {
  remove(ref(database, 'todolist/'));
}

export {writeListData, getListData, removeListData};