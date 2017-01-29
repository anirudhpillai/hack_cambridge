"""
run this file to keep the tick function happening every 100ms
"""

from time import sleep
import requests

while True:
    url = "https://hackcam.localtunnel.me/schedule"
    r = requests.get(url)
    sleep(100)
