Setting up Camera for night vision

*This is the setup for the waveshare cams*

To enable night vision mode

1. Edit the config.txt file:

```bash
sudo nano /boot/config.txt
```

and append:

```bash
disable_camera_led=1
```