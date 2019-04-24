# Open CV setup for security camera

*An optimized open cv setup for a raspberry pi 3 with pi camera installed.*

1. Install [raspbian stretch](https://www.raspberrypi.org/downloads/raspbian/)

    Use [etcher](https://www.balena.io/etcher/) to copy raspbian stretch image to an sd card

2. Add **wpa_supplicant.conf** to boot partition of SD card

    This file contains the info for connecting to a wireless network. The format is:

    ```json
    country=ZA
    update_config=1
    ctrl_interface=/var/run/wpa_supplicant

    network={
        ssid="********"
        psk="*********"
        key_mgmt=WPA-PSK
    }

    ```    

3. Boot up pi with sd card.

4. Enable ssh, camera & vnc. 

    Open **preferences>Interfaces** & enable camera, ssh & vnc

5. Get ip address of raspberry pi on router.
    On Huawei B315 go to **statistics> Connected wlan clients**

```bash
// eg. 192.168.8.106
```


6. Open terminal & copy public to pi (Use ssh keygen if you don't already have a private/public key pair. See [here](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)
```bash
ssh-copy-id pi@192.168.8.106
```
Now you can ssh into the pi using the key passphrase.

```bash
ssh pi@192.168.8.106
```

7. Expand file system. 

```bash
sudo raspi-config
```
Choose advanced options and expand file system.

Reboot after completion

8. Make space by deleting Wolfram Engine and LibreOffice 

```bash
sudo apt-get purge wolfram-engine
sudo apt-get purge libreoffice
sudo apt-get clean
sudo apt-get autoremove
```

9. Update os

```bash
sudo apt-get update && sudo apt-get upgrade
```

If you get errors around resolving mirror, find a mirror closer to you using [Raspbian mirrors](https://www.raspbian.org/RaspbianMirrors). eg. South African mirror is http://raspbian.mirror.ac.za/raspbian/. Edit sources and change url.

```bash
sudo nano /etc/apt/sources.list
```


10. Install dependencies


```bash
sudo apt-get install build-essential cmake pkg-config
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libgtk2.0-dev libgtk-3-dev
sudo apt-get install libcanberra-gtk*
sudo apt-get install libatlas-base-dev gfortran
sudo apt-get install python2.7-dev python3-dev
```

11. Download open, unzip and rename open cv and open cv contrib packages

```bash
cd ~
wget -O opencv.zip https://github.com/opencv/opencv/archive/4.0.0.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.0.0.zip
unzip opencv.zip
unzip opencv_contrib.zip
mv opencv-4.0.0 opencv
mv opencv_contrib-4.0.0 opencv_contrib
```

12. Install numpy
```bash
pip3 install numpy
```

13. Compile OpenCV 4 for your Raspberry Pi


```bash
cd ~/opencv
mkdir build
cd build
```

14. Run cmake for OpenCV 4


```bash
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules \
    -D ENABLE_NEON=ON \
    -D ENABLE_VFPV3=ON \
    -D BUILD_TESTS=OFF \
    -D OPENCV_ENABLE_NONFREE=ON \
    -D INSTALL_PYTHON_EXAMPLES=OFF \
    -D BUILD_EXAMPLES=OFF ..
```

15. Increase the SWAP size on the Raspberry Pi
Facilitates all 4 pi cores to be used without hanging.

```bash
sudo nano /etc/dphys-swapfile
```
Change **CONF_SWAPSIZE** to 2048:

```yaml
# you most likely don't want this, unless you have an special disk situation
# CONF_SWAPSIZE=100
CONF_SWAPSIZE=2048
```

16. Restart swap service

```bash
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```
**NB Change swap size back after compilation!**

17. Compile OpenCV 4
Compiles using all 4 cores.

```bash
make -j4
```

18. Install OpenCV 4:

```bash
sudo make install
sudo ldconfig
```

19. Reduce swap size to 100Mb again & restart swap service
```bash
sudo nano /etc/dphys-swapfile 
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```

20. Copy the cv2 library to /usr/local/lib/python3.5/dist-packages:

```bash
cd /lib/python3 #~/opencv/build/lib/python3
sudo cp cv2.cpython-35m-arm-linux-gnueabihf.so /usr/local/lib/python3.5/dist-packages/cv2.so
```

## Recommendation: Backup SD card
On mac:

1. Insert SD card and run:

```bash
diskutil list
```

This will list devices eg. /dev/disk1

2. Create image with:

```bash
dd if=/dev/disk2 of=~/openCvRaspbian.img bs=1m
```
where disk2 is the id of the sd card you want to create an image from.


##Test Run

1. Download from pyimage search

2. Install dependencies

pip3 install imutils
pip3 install "picamera[array]"

3. Update Videostream initialization. Replace `src=0` with `usePiCamera=True`


