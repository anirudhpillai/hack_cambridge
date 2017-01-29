"""
run this file to keep the tick function happening every 100ms
"""

from time import sleep
import requests

print("Running")

while True:
    url = "http://localhost:5000/schedule"
    r = requests.get(url)
    sleep(100)
