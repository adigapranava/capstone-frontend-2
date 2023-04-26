// Initialize Firebase
var firebaseConfig = {
    authDomain: "pythonimageupload-99434.firebaseapp.com",
    apiKey: "AIzaSyBhGSwgsiF-6ayIUzRbd7y3rj9IS9WmC6c",
    databaseURL: "https://pythonimageupload-99434-default-rtdb.firebaseio.com/",
    projectId: "pythonimageupload-99434",
    storageBucket: "pythonimageupload-99434.appspot.com",
    serviceAccount: {
        type: "service_account",
        project_id: "pythonimageupload-99434",
        private_key_id: "a206eed2141ec9062476ee1596553e121a1d013f",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsK/Q6FTiBi7Z8\n8xxnIyGK+UrKB70aNLdUcihBOe0Xq7JZxrTvzSDgh8ArWW7OI5Bt3Jzr9ZDW5gFd\nimzZFHTYwBzB+DJR0BzwIvrdbzDPt588apO9rwbDGREdgCidxCaiIx0SMVWdlOez\nZAKiYNex1aXZkhOGQCxDl6DLa2+GFP3DNLWbpcGQQ1rYWL+U6BZqldNFW1fu8OZz\n2iDWlz2YnZolX/F38ekf37Sxj3teIM+Q2F37cWArWS3CYoOLKKW5AMunBfZ963s2\nxPEhMFJqYzDGLNapxllA+4Mi2jOZI9/amw4KWYRmS95vblyTfaka9g+qfgYKJt25\nDxwB9LUxAgMBAAECggEAPmcR9olheSaz5lbRORqVGkNf1Zj3c8uelQdpSrbdlcI/\n+uUYCIBvRaI+Rxf7ntBqFT+sSqOvMwybexVkfUu6TCNZaP518ow9KNZs2Zxm8yqJ\nFwND+DC7gTQRLYGZdxE0tXiHnWPvNZXWYwFBKSxzkTuwCIs282ZIBNmsyH3wpoZU\nZR4lt+4aYKK15oq3miV57f607nFxTZTWTaEWvhcQ5Z9q3Fj/4WUnSNS0Xr0RCbk7\nN4mlso7TUFVUNwCXFDDc2P6kBFieuHACxFCPTgISdBvBcR4SAG6RRSSGfrlfeejE\neBGoxHt3/LHIkHcVuiAs/EJLACfRvGBh0cxh5bM+TwKBgQDyy9BYrNkMQ9LQyXug\nC6jNvkAdwn9z9OAUqzTkrkR3BJmC498vI1mxCwfSzLkQiJz2/kYO01oLUPQ2IziA\noDrqJg0aHNdSemwg1lGmRhdkeXRDv5xJcubduID/nXyJJEX/zaDErDncLgMxzXAW\n7KRVjWGBYa+RS6bTAY27zHB52wKBgQC1iOmyZt3iTWG1kaVPow7hxtL226puOoCE\nazp8k8aSu06NQnw2x+w6BYHZly6W3KALq6WBrFsk3ByibxVA2iYf9LVFW1ZAjH3L\nIwKwdApLUdMsc6cn5XiI+GBvuyV1ssOKwqv65WzrmoF9YzapnAeN/nWYVFcWUPJx\nALa7f2544wKBgQDxuMaJsjQ5CME3CpEg6tq5U0MEHeLEMDRzf2wei/0vvQ2UiYdm\np7whDglQ7m8FLe2P3eEj23mXMJah23jiXiOpgA6lQ7d/rtA99QG/F6Msbdq5pGdV\nnKaKcalEU6dr5ggmv7Lie1Dzi3+0soJ44EpPvn0n0Xh4oCfLhY11Pflw5wKBgHO4\neEjaXB0zeNLWqkuuxQDVzovAkc88icpf1GOvjAjjT/qqZCZDoWmHMzQytGdE8t0d\nqR6VcXB4w+Qj7aduqJj8VEWHKN9y74l7ou46uoky+uu+OdMr639c3ZS79vAlaZNd\n72W7tIgn8N2uTh0msoYorGvTb8RxC2tPqiyx2glDAoGALbA2jZl+E4gO7Wk36HZH\nIbDwmBxvGaY2s+iDTvYajl09BBPWnJiZgxqCEKScWFjV456xtl4Xm/t5KA4koxYm\n1ryXSsOClT53Sdvf/hh/Z2uUqr0fmqlCWEV3OYoY+IBBUzEOLMxNy+ELwWe8zCbp\n3lhe9sx87sg9sZbGOF0aPO8=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-wgrao@pythonimageupload-99434.iam.gserviceaccount.com",
        client_id: "108008562746572805432",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wgrao%40pythonimageupload-99434.iam.gserviceaccount.com"
      }
      
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
dbRef.orderByKey().limitToLast(10).on('value', function(snapshot) {
    var listData = snapshot.val();
    visitorsList.innerHTML = ''; // Clear previous visitors list
    for (var key in listData) {
    if (listData.hasOwnProperty(key)) {
        var visitor = listData[key];
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
        if (visitor.status && !visitor.acknowledged){
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