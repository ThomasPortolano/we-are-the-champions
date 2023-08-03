import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-fc6bc-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementInDB = ref(database, "endorsement");

const inputFieldEl = document.getElementById('input-field');
const submitBtnEl = document.getElementById('submit-btn');
const endorsementListEl = document.getElementById('endorsement-list');

submitBtnEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value;
    
    push(endorsementInDB, inputValue);

    clearInputField();
})

function clearInputField(){
    inputFieldEl.value = '';
}

function clearEndorsementList(){
    endorsementListEl.innerHTML = '';
}

onValue(endorsementInDB, function(snapshot){
    if (snapshot.exists()){
        let itemArrays = Object.entries(snapshot.val());
        clearEndorsementList();

        for (let i = 0; i < itemArrays.length; i++){
            let currentItem = itemArrays[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
        
            appendItemToEndorsementListEl(currentItem)
        }
    } else {
        endorsementListEl.innerHTML = "No endorsement... yet"
    } 
})

function appendItemToEndorsementListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function(){
        remove(ref(database, `endorsement/${itemID}`))})

    endorsementListEl.append(newEl);
}