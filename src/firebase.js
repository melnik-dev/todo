// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove, child, get } from "firebase/database";
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

function getListData() {
    const starCountRef = ref(database, 'todolist/');
    let data;
        onValue(starCountRef, (snapshot) => {
        data = snapshot.val();

        console.log(data);
    });
    return data;
// let todosFB = [];
//     Object.keys(data).forEach(key => {
//         const value = data[key]
//     })
//     todosFB.push(
//         new Task(
//             id,
//             text,
//             checked,
//         )
//     )
}

function getOneListData(tasks) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `todolist/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

            Object.keys(data).forEach(key => {
                const value = data[key];

                let to = {
                    id: value.id,
                    text: value.text,
                    checked: value.checked
                }
                tasks.push(to);
            })
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


function removeListData() {
  remove(ref(database, 'todolist/'));

    // update(ref(database, 'todolist/'), tasks)
    //     .then(() => {
    //         // Data saved successfully!
    //         console.log('database send')
    //     })
    //     .catch((error) => {
    //         // The write failed...
    //         console.log(error)
    //     });

}

export {writeListData, getListData, removeListData, getOneListData};