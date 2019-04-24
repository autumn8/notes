```bash
sudo nano /etc/dhcpcd.conf
```

To create a wifi static ip, enter:

```bash
interface wlan0
static ip_address=192.168.8.210/24
static routers=192.168.8.1
static domain_name_servers=192.168.8.1 
```