// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBhGSwgsiF-6ayIUzRbd7y3rj9IS9WmC6c",
    authDomain: "pythonimageupload-99434.firebaseapp.com",
    databaseURL: "https://pythonimageupload-99434-default-rtdb.firebaseio.com",
    projectId: "pythonimageupload-99434",
    storageBucket: "pythonimageupload-99434.appspot.com",
    messagingSenderId: "566073350313",
    appId: "1:566073350313:web:e4c2edcc017ca22a6f71b8",
    measurementId: "G-S9Q2TFVDYL"
  };
  
firebase.initializeApp(firebaseConfig);

var DB = firebase.database();
const USERNAME = "praadiga";

// get Storage reference
var storageRef = firebase.storage().ref();

var IMAGE_COUNT = 0;


// Get all files from storage

// Create a reference under which you want to list
var listRef = storageRef.child(USERNAME + '/Owner');


function loadImages(){

    // get files count
    listRef.listAll().then(function(res) {
        IMAGE_COUNT = 0;
        var cards = document.getElementById("cards");
        cards.innerHTML = "";
        res.items.forEach(function(itemRef) {
            // All the items under listRef.
            IMAGE_COUNT = IMAGE_COUNT + 1;
            console.log(itemRef.toString());
            itemRef.getDownloadURL().then(function(url) {
                var div_element = document.createElement("div");
                div_element.className = "card";
                div_element.style = "margin-right: 20px width: 500px;";
                
                var img = document.createElement("img");
                img.className = "card-img-top";
                img.src = url;
                div_element.appendChild(img);

                var del_btn = document.createElement("button");
                del_btn.className = "btn btn-danger";
                del_btn.innerHTML = "Delete";
                del_btn.onclick = function(){
                    // delete image
                    itemRef.delete().then(function() {
                        // File deleted successfully
                        console.log("File deleted successfully");
                        window.location.reload();
                    }).catch(function(error) {
                        // Uh-oh, an error occurred!
                        console.log(error);
                    });
                }
                div_element.appendChild(del_btn);

                cards.appendChild(div_element);
            }).catch(function(error) {
                // Handle any errors
                console.log(error);
            });
        });
        if (IMAGE_COUNT == 2){
            // disable upload button
            console.log("disable upload button");
            document.getElementById("uploadBtn").disabled = true;
        }
    }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });
}

function getImgCount(){
    return IMAGE_COUNT;
}


// func uploadImage
function uploadImage(){
    console.log(IMAGE_COUNT);
    var file = document.getElementById("file").files[0];


    // detect face and crop it and upload it
    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    


    var storageRef = firebase.storage().ref();
    var thisRef = storageRef.child(USERNAME + '/Owner/owner' + String(Math.random(1000)) + '.jpg');
    thisRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
        // page reload
        window.location.reload();
    });
}

// on window load
window.onload = function(){
    loadImages();
}

