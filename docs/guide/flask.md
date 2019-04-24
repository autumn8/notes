```bash
pip install flask
```

1. By default site is only accessible on local machine. To open it up to other machines on the network, set host address to '0.0.0.0'

2. For local testing purposes install cors

```bash
pip install -U flask-cors
```

```python
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
```

To run alongside other python code in a while loop, create a process and run loop inside process, using multiprocessing values to share state between processes:

```python
def main_loop(isCameraOn):
    while True:
        if isCameraOn.value == False:
            print('Camera stopped.')
            time.sleep(3)
            continue      
        
        print("camera running")            
        time.sleep(1)

p = Process(target=main_loop, args=(isCameraOn,))
p.start()
app.run(debug=True, use_reloader=False, port=3000, host='0.0.0.0')
p.join()

```