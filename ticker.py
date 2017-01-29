"""
run this file to keep the tick function happening every 100ms
"""

from time import sleep
import requests

print("Running")

while True:
    url = "http://localhost:5000/scheduler"
    r = requests.get(url)
    print(r.status_code)
    sleep(0.1)
