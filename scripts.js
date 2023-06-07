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

// Create a new Audio object
var audio = new Audio('knok.mp3');

// Set the muted attribute to allow the audio to play without user interaction
audio.muted = false;


const visitorsContainer = document.querySelector('#visitors-container');
const visitorsList = document.querySelector('#visitors-list');
// console.log("hello");

// accept visitor
function acceptVisitor(visitorId){
  var dbRef = DB.ref(USERNAME + "/visitorsList/");
  dbRef.orderByKey().limitToLast(10).on('value', function(snapshot) {
    var listData = snapshot.val();
    for (var key in listData) {
      if (listData.hasOwnProperty(key)) {
        var visitor = listData[key];
        if (visitor.visitorId === visitorId){
          var dbRef2 = DB.ref(USERNAME + "/visitorsList/" + key);
          dbRef2.update({
            acknowledged: true,
            ackStatus: true
          });
        }
      }
    }
  });
}

// reject visitor
function rejectVisitor(visitorId){
  var dbRef = DB.ref(USERNAME + "/visitorsList/");
  dbRef.orderByKey().limitToLast(10).on('value', function(snapshot) {
    var listData = snapshot.val();
    for (var key in listData) {
      if (listData.hasOwnProperty(key)) {
        var visitor = listData[key];
        if (visitor.visitorId == visitorId){
          var dbRef2 = DB.ref(USERNAME + "/visitorsList/" + key);
          dbRef2.update({
            acknowledged: true,
            ackStatus: false
          });
        }
      }
    }
  });
}



var dbRef = DB.ref(USERNAME + "/visitorsList");
// Retrieve the data from the database
dbRef.once("value").then(function(snapshot) {
  // Get the data snapshot
  var data = snapshot.val();

  // Check if there are any elements in the visitorsList
  if (data) {
    // Iterate over each element in the visitorsList
    Object.keys(data).forEach(function(key) {
      var element = data[key];
      console.log(element);
    });
  } else {
    console.log("No elements found in visitorsList");
  }
}).catch(function(error) {
  console.log("Error retrieving data:", error);
});



dbRef.orderByKey().limitToLast(10).on('value', function(snapshot) {
    var listData = snapshot.val();
    console.log(listData);
    visitorsList.innerHTML = ''; // Clear previous visitors list
    for (var key in listData) {
    if (listData.hasOwnProperty(key)) {
        var visitor = listData[key];
        console.log(visitor);
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-4');

        // Add visitor's image on the right side of the card
        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = visitor.image;
        card.appendChild(image);

        // Add visitor's details on the left side of the card
        const details = document.createElement('div');
        details.classList.add('card-body');

        const visitorId = document.createElement('h5');
        visitorId.classList.add('card-title');
        visitorId.textContent = '#' + visitor.visitorId;
        details.appendChild(visitorId);

        const timeArrived = document.createElement('p');
        timeArrived.classList.add('card-text');
        timeArrived.textContent = getTimeElapsed(visitor.timeArrived);
        details.appendChild(timeArrived);
        if (visitor.automated){
          const viewButton = document.createElement('button');
          viewButton.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
          viewButton.textContent = 'Accepted | Auto';
          details.appendChild(viewButton);
        }else if (visitor.status && !visitor.acknowledged){
          const viewButton = document.createElement('button');
          viewButton.classList.add('btn', 'btn-success', 'btn-block');
          viewButton.textContent = 'Accept';
          viewButton.addEventListener('click', function() {
            acceptVisitor(visitor.visitorId);
          });
          details.appendChild(viewButton);

          const viewButton2 = document.createElement('button');
          viewButton2.classList.add('btn', 'btn-danger', 'btn-block');
          viewButton2.textContent = 'Reject';
          viewButton2.addEventListener('click', function() {
            rejectVisitor(visitor.visitorId);
          });
          details.appendChild(viewButton2);
          var audio = document.getElementById("audio");
          audio.play();
          audio.muted = false;
        }else if (!visitor.status && !visitor.acknowledged){
          const viewButton = document.createElement('button');
          viewButton.classList.add('btn', 'btn-primary', 'btn-block', 'disabled');
          viewButton.textContent = 'Timed Out';
          details.appendChild(viewButton);
        } else if (visitor.acknowledged && visitor.ackStatus){
          const viewButton = document.createElement('button');
          viewButton.classList.add('btn', 'btn-success', 'btn-block', 'disabled');
          viewButton.textContent = 'Accepted';
          details.appendChild(viewButton);
        }else if (visitor.acknowledged && !visitor.ackStatus){
          const viewButton = document.createElement('button');
          viewButton.classList.add('btn', 'btn-danger', 'btn-block', 'disabled');
          viewButton.textContent = 'Rejected';
          details.appendChild(viewButton);
        }

        

        card.appendChild(details);

        // Add the card to the visitors list
        visitorsList.appendChild(card);

        // reverse the child order
        visitorsList.insertBefore(visitorsList.lastChild, visitorsList.firstChild);
    }
    }
})
visitorsContainer.style.display = 'block';

// Get the elapsed time since the visitor arrived
function getTimeElapsed(arrivedTime) {
  const now = new Date();
  const elapsedTime = now.getTime() - new Date(arrivedTime).getTime();
  if (elapsedTime < 60000) {
    return `${Math.floor(elapsedTime / 1000)}s ago`;
  } else if (elapsedTime < 3600000) {
    return `${Math.floor(elapsedTime / 60000)}min ago`;
  } else if (elapsedTime < 86400000) {
    return `${Math.floor(elapsedTime / 3600000)}h ago`;
  } else {
    return `${Math.floor(elapsedTime / 86400000)}d ago`;
  }
}
