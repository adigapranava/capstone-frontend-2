import pyrebase
from picamera import PiCamera
from time import sleep
import time, os
from datetime import datetime
import RPi.GPIO as GPIO

USERID = "praadiga"
#  TODO : Implement Door Number
DOOR_NUMBER = "DOOR1"
CONFIG =    {
  "apiKey": "AIzaSyBhGSwgsiF-6ayIUzRbd7y3rj9IS9WmC6c",
  "authDomain": "pythonimageupload-99434.firebaseapp.com",
  "projectId": "pythonimageupload-99434",
  "storageBucket": "pythonimageupload-99434.appspot.com",
  "databaseURL": "https://pythonimageupload-99434-default-rtdb.firebaseio.com/",
  "serviceAccount": "serviceAccountKey.json" 
}
firebase = pyrebase.initialize_app(CONFIG)
STORAGE= firebase.storage()
DB = firebase.database()

DB_USER = DB.child(USERID)
TIME_OUT = 30

isExist = os.path.exists(USERID+"_VISITORS")
if not isExist:
   # Create a new directory because it does not exist
   os.makedirs(USERID+"_VISITORS")


button_pin = 2
led_pin = 3
GPIO.setmode(GPIO.BCM)
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    # Wait for button to be pressed
    GPIO.wait_for_edge(button_pin, GPIO.FALLING)
    
    
    # generate filename
    DB_USER = DB.child(USERID)
    visitorCount =DB_USER.child("visitorCount").get().val()
    if not visitorCount:
        visitorCount =DB.child(USERID).child("visitorCount").get().val()
    visitorCount += 1
    filename="stranger"+str(visitorCount)+".jpg"
    firebase_path=USERID+"/" +filename
    local_path = USERID+"_VISITORS""/" +filename

    # turn on the led
    # wait 1s
    # take a photo
    camera = PiCamera()
    print("Cheese!!!")
    sleep(2)
    camera.capture(local_path)
    camera.close()

    # upload to firebase
    STORAGE.child(firebase_path).put(local_path)
    IMAGE_PUBLIC_URL = STORAGE.child(firebase_path).get_url(None)
    # change visitors Count
    DB.child(USERID).update({"visitorCount": visitorCount})

    # create visitor
    arrived_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    visitor = {
        "visitorId": "visitor"+ str(visitorCount),
        "image": IMAGE_PUBLIC_URL,
        "timeArrived": arrived_time,
        "status": True, # true: can accept or reject | false : timedout
        "acknowledged": False,
    }
    # add visitor
    visitors_list = DB.child(USERID).child("visitorsList").get().val()

    if not visitors_list:
        visitors_list = []

    # Add a new item to the list
    visitors_list.append(visitor)

    # Set the value of the database reference to the updated list
    DB.child(USERID).update({"visitorsList" : visitors_list})
    
    # Wait for ack to become True or for 30 seconds to elapse
    start_time = time.time()
    while True:
        visitors_list = DB.child(USERID).child("visitorsList").get().val()
        visitor = visitors_list[-1]
        if visitor['acknowledged']:
            if visitor['ackStatus']:
                print("Door Opens")
            else:
                print("NO ACCESS")
            break
        elif time.time() - start_time >= TIME_OUT:
            print("No Response From Owner")
            visitors_list[-1].update({'status': False})
            DB.child(USERID).update({"visitorsList" : visitors_list})
            break
        time.sleep(1)
