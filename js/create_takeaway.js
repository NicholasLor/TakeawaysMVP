import { app, db } from './firebase_init.js'
import { collection, query, getDocs, addDoc } from "firebase/firestore";

const takeawaysRef = collection(db,'takeaways');
const create_takeaway_button = document.getElementById("create_takeaway");

const form = document.getElementById("myform");

// when create_takeaway_button is clicked, create a new takeaway in firebase

form.addEventListener('submit', event => {
    event.preventDefault();
  
    const title = document.getElementById("takeaway-title").value;
    const description = document.getElementById("takeaway-description").value;
  
    console.log(title);
    console.log(description);
  
    (async () => {
      const docRef = await addDoc(takeawaysRef, {
        title: title,
        description: description,
      });

      form.reset();
      window.location.href = "takeaway_edit.html?" + "takeaway=" + docRef.id;
    })();
  });


// create_takeaway_button.addEventListener('click', async event => {
//     const title = document.getElementById("takeaway-title").value;
//     const description = document.getElementById("takeaway-description").value;

//     console.log(title);
//     console.log(description);

//     const docRef = await addDoc((takeawaysRef), {
//         title: title,
//         description: description,
//     });
// });