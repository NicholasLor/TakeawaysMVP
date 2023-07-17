import { app, db } from './firebase_init.js'
import { collection, query, getDocs } from "firebase/firestore";


const allTakeaways = await getDocs(collection(db, "takeaways"));

allTakeaways.forEach((doc) => {
    console.log(doc.id, doc.data());
});

const testDiv = document.getElementById('test');


allTakeaways.forEach((takeaway) => {
    const list_item = document.createElement("a");
    list_item.className = "list-group-item list-group-item-action d-flex gap-3 py-3";
    list_item.setAttribute("aria-current", "true");
    list_item.href = "takeaway_edit.html?" + "takeaway=" + takeaway.id;

    const img = document.createElement("img");
    img.src = "https://github.com/twbs.png"
    img.className = "rounded-circle flex-shrink-0";
    img.width = 32;
    img.height = 32;

    const div_wrapper = document.createElement("div");
    div_wrapper.className = "d-flex gap-2 w-100 justify-content-between";

    const inner_div = document.createElement("div");

    const takeaway_title = document.createElement("h6");
    takeaway_title.className = "mb-0";
    takeaway_title.textContent = takeaway.data().title;

    const takeaway_description = document.createElement("p");
    takeaway_description.className = "mb-0 opacity-75";
    takeaway_description.textContent = takeaway.data().description;

    const takeaway_description2 = document.createElement("p");
    takeaway_description2.className = "mb-0 opacity-75";
    takeaway_description2.textContent = "";

    inner_div.appendChild(takeaway_title);
    inner_div.appendChild(takeaway_description);
    inner_div.appendChild(takeaway_description2);

    const last_edited = document.createElement("small");
    last_edited.className = "opacity-50 text-nowrap";
    last_edited.textContent = "1d";

    div_wrapper.appendChild(inner_div);
    div_wrapper.appendChild(last_edited);

    list_item.appendChild(img);
    list_item.appendChild(div_wrapper);
    testDiv.appendChild(list_item);

    
});







