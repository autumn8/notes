## Sending Video frames over mqtt

This describes streaming  of video frames from a pi  using a pyton mqtt client to 
1. another python file over mqtt
2. a javascrip web client


## Enable websocket in mosquitto broker.
If you are running a local mosquitto broker you need to enable websockets, for the mqtt client running in browser.

1. Stop mosquitto broker
```bash
brew services stop mosquitto
```

2. Edit mosquitto.conf and add websockets as protocol at end of file.

```bash
sudo nano /usr/local/etc/mosquitto/mosquitto.conf
```

```bash
listener 1883
protocol mqtt

listener 9001
protocol websockets

```
## Create python file for sending frames

```python


import cv2
import paho.mqtt.client as mqtt
import time
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH,320)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT,240)

client = mqtt.Client(transport="websockets")
client.connect("192.168.8.102", 9001, 60) #9001 is websocket port

while(cap.isOpened()):
    client.loop()
    ret, frame = cap.read()    
    if ret == True:        
        ret, jpeg = cv2.imencode('.jpg', frame)       
        client.publish("camera/image",jpeg.tobytes(),0)
        
cap.release()
cv2.destroyAllWindows() 

```

## Receive images in browser

```javascript

import mqtt from "mqtt";

const hostname = "mqtt://localhost:9001";
    const client = mqtt.connect(hostname);

    client.on("connect", function() {
      client.subscribe("camera/image");
    });

    client.on("message", (topic, message) =>{             
      this.$refs.camera1_stream.src = 'data:image/jpeg;base64,'+ message.toString("base64");
    });
    //this.$refs.camera1_stream is a vue.js reference to the image element in DOM 

```

 
