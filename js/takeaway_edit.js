import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDocs, doc, query, where, collection, orderBy, addDoc, getDoc } from "firebase/firestore";
import { app, db } from './firebase_init.js'
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

Swiper.use([Pagination])



// Save an uploaded file as images/test.jpg:

// const storageRef = ref(storage, 'images/test.jpg');
// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             var img = document.querySelector('img');
//             img.onload = () => {
//                 URL.revokeObjectURL(img.src);  // no longer needed, free memory
//             }

//             img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//             uploadBytes(storageRef, this.files[0]).then((snapshot) => {
//                 console.log('Uploaded a blob or file!');
//             },
//             // get the download URL
//             getDownloadURL(ref(storage, 'images/test.jpg')).then((url) => {
//                 // Insert url into an <img> tag to "download"
//                 console.log("File available at", url);
//             })

//             );
//         }
//     });
//     });


// const querySnapshot = await getDocs(collection(db, "takeaways/DHO2Llk1mb0U99hP8GsY/slides"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// // query above snapshot where slide_row_index == 0
// const q = query(collection(db, "takeaways/DHO2Llk1mb0U99hP8GsY/slides"), where("slide_row_index", "==", 0));
// // same query as aboce except order it ascending


//
var urlParams = new URLSearchParams(window.location.search);
var takeawayID = urlParams.get('takeaway');
var counter = 0;
var swipercounter = 0;

// // GET ROWS - get count of slides where slide_column_index = 0
// const q2 = query(collection(db, "takeaways/" + takeawayID + "/slides"), where("slide_column_index", "==", 0),  orderBy("slide_column_index", "asc"));
// const querySnapshot2 = await getDocs(q2);
// console.log(querySnapshot2.size);

// // Loop through the querySnapshot2.size value
// querySnapshot2.forEach(async (doc) => {
//   // GET SLIDES IN A CERTAIN ROW INDEX
//   const q = query(collection(db, "takeaways/" + takeawayID + "/slides"), where("slide_row_index", "==", doc.data().slide_row_index), orderBy("slide_row_index", "desc"));
//   const querySnapshot = await getDocs(q);
//   console.log("size: " + querySnapshot.size);
//   console.log("slide_row_" + querySnapshot.size);

//   const swiperDiv = document.createElement("div");
//   swiperDiv.className = "swiper mySwiper";

//   const swiperWrapper = document.createElement("div");
//   swiperWrapper.className = "swiper-wrapper";

//   querySnapshot.forEach((doc) => {
//     const swiperSlide = document.createElement("div");
//     swiperSlide.className = "swiper-slide";

//     const slideURL = doc.data().slide_URL;
//     console.log(slideURL);
//     const img = document.createElement("img");
//     img.src = slideURL;
//     img.className = "d-block w-100";

//     swiperSlide.appendChild(img);
//     swiperWrapper.appendChild(swiperSlide);
//   });

//   swiperDiv.appendChild(swiperWrapper);

//   const swiperPagination = document.createElement("div");
//   swiperPagination.className = "swiper-pagination";

//   swiperDiv.appendChild(swiperPagination);

//   const body = document.body;
//   body.appendChild(swiperDiv);

//   var mySwiper = new Swiper(".mySwiper", {
//     pagination: {
//       el: ".swiper-pagination",
//     },
//   });
// });

const headerTitle = document.getElementById("titlefont");

// get title of takeaway by using takeawayID
const takeawayDoc = doc(db, "takeaways", takeawayID);
const takeawayDocSnap = await getDoc(takeawayDoc);

headerTitle.innerHTML = takeawayDocSnap.data().title;


const q2 = query(collection(db, "takeaways/" + takeawayID + "/slides"), where("slide_column_index", "==", 0), orderBy("slide_row_index", "asc"));
const querySnapshot2 = await getDocs(q2);
console.log(querySnapshot2.size);

// // Get elements
// var fileInput = document.getElementById("myFileInput");
// var imagePreview = document.getElementById("imagePreview");

// // Listen for file selection
// fileInput.addEventListener("change", function(event) {
//   var file = event.target.files[0]; // Get the selected file

//   // Create a root reference
//   const storage = getStorage();
//   const storageRef = ref(storage, file.name);

//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log(snapshot);
//     console.log('Uploaded a blob or file!');
//     getDownloadURL(snapshot.ref).then(url => {
//       // Set the image preview tag to the URL
//       var imagePreview = document.getElementById("imagePreview");
//       imagePreview.src = url;

//       // Add the URL to your database or perform any other necessary actions
//       addDoc(collection(db, "takeaways/" + takeawayID + "/slides"), {
//         slide_URL: url,
//         slide_row_index: 1,
//         slide_column_index: 2,
//       });
//     });
//   });
// });

if (querySnapshot2.size === 0) {
  // If the first query has no documents, create a placeholder with a large "+" SVG
  const swiperDiv = document.createElement("div");
  swiperDiv.className = "swiper mySwiper";

  const swiperWrapper = document.createElement("div");
  swiperWrapper.className = "swiper-wrapper";

  // Create the placeholder div with "+" SVG
  const placeholderDiv = document.createElement("div");
  placeholderDiv.className = "swiper-slide";

  const textdiv = document.createElement("div");
  textdiv.display = "flex";
  const p = document.createElement("p");
  p.innerHTML ="Add a slide";
  textdiv.appendChild(p);
  placeholderDiv.appendChild(textdiv);

  swiperWrapper.appendChild(placeholderDiv);
  swiperDiv.appendChild(swiperWrapper);

  const swiperPagination = document.createElement("div");

  swiperDiv.appendChild(swiperPagination);

  const body = document.body;
  body.appendChild(swiperDiv);



    var mySwiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
  });
} else {
  // If the first query has documents, create the dynamic page content
  querySnapshot2.forEach(async (doc) => {

    // GET SLIDES IN A CERTAIN ROW INDEX
    const q = query(
      collection(db, "takeaways/" + takeawayID + "/slides"),
      where("slide_row_index", "==", doc.data().slide_row_index),
      orderBy("slide_column_index", "asc")
    );
    const querySnapshot = await getDocs(q);
    console.log("size: " + querySnapshot.size);
    console.log("slide_row_" + querySnapshot.size);

    const swiperDiv = document.createElement("div");
    swiperDiv.className = "swiper mySwiper";


    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";
    swiperWrapper.id = "swiper-wrapper-" + swipercounter;
    swipercounter++;

    querySnapshot.forEach((doc) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.className = "swiper-slide";

      const slideURL = doc.data().slide_URL;
      console.log(slideURL);
      const img = document.createElement("img");
      img.src = slideURL;
      img.className = "d-block w-100";

      swiperSlide.appendChild(img);
      swiperWrapper.appendChild(swiperSlide);
    });

    swiperDiv.appendChild(swiperWrapper);

    const swiperPagination = document.createElement("div");
    swiperPagination.className = "swiper-pagination";

    swiperDiv.appendChild(swiperPagination);

    const body = document.body;
    body.appendChild(swiperDiv);

    generateFileInputContainer();

    var mySwiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
      });
  });
}


function generateFileInputContainer() {

  // Create the container div element
  var containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Create the file input element
  var fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('id', `myFileInput${counter}`); // Use the counter to make the ID unique
  fileInput.setAttribute('style', 'display: none;'); // Hide the file input

  // Create the button element
  var button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.classList.add('btn', 'btn-outline-primary', 'w-100', 'py-2');
  button.setAttribute('onclick', `document.getElementById('myFileInput${counter}').click()`); // Use the counter to reference the correct file input
  button.setAttribute('value', '+');

  // Create the label element
  var label = document.createElement('label');
  label.setAttribute('for', `myFileInput${counter}`); // Use the counter to link with the correct file input
  label.classList.add('label');
  label.textContent = 'No File Chosen';
  // hide label 
  label.setAttribute('style', 'display: none;');

  counter++; // Increment the counter

  // Listen for file selection
  fileInput.addEventListener("change", function(event) {
    var file = event.target.files[0]; // Get the selected file

    // Create a root reference
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log(snapshot);
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref).then(url => {
        // Set the image preview tag to the URL
        // var imagePreview = document.getElementById("imagePreview");
        // imagePreview.src = url;

        console.log("swiper-wrapper-" + (counter));

        // get the corresponding swiper id, create a new swiper slide, and append it to the swiper wrapper
        const swiperWrapper = document.getElementById("swiper-wrapper-" + (counter-1));
        const swiperSlide = document.createElement("div");
        swiperSlide.className = "swiper-slide";

        const img = document.createElement("img");
        img.src = url;
        img.className = "d-block w-100";

        swiperSlide.appendChild(img);
        swiperWrapper.appendChild(swiperSlide);

        // get count of swiper slides in swiper wrap  per
        const swiperSlides = swiperWrapper.getElementsByClassName("swiper-slide");
        console.log(swiperSlides.length);


        // Add the URL to your database or perform any other necessary actions
        addDoc(collection(db, "takeaways/" + takeawayID + "/slides"), {
          slide_URL: url,
          slide_row_index: counter-1,
          slide_column_index: swiperSlides.length-1,
        });

        var mySwiper = new Swiper(".mySwiper", {
          pagination: {
            el: ".swiper-pagination",
          },

        });


      });
    });
  });

  // Append elements to the container div
  containerDiv.appendChild(fileInput);
  containerDiv.appendChild(button);
  containerDiv.appendChild(label);

  // Append the container div to the document body or any desired parent element
  document.body.appendChild(containerDiv);
}


// const q = query(collection(db, "takeaways"), where("title", "==", "Project Portfolio"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
// });

// get sildes collection within takeaway document query snapshot



// getDownloadURL(ref(storage, 'images/Cryptolobbying Showcase-02.jpg'))
//   .then((url) => {
//     // `url` is the download URL for 'images/stars.jpg'

//     // This can be downloaded directly:
//     // const xhr = new XMLHttpRequest();
//     // xhr.responseType = 'blob';
//     // xhr.onload = (event) => {
//     //   const blob = xhr.response;
//     // };
//     // xhr.open('GET', url);
//     // xhr.send();

//     // Or inserted into an <img> element
//     const img = document.getElementById('myimg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     // Handle any errors
//   });