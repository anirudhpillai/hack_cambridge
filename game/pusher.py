from config import *
import requests
import json

def upload_item(item_data):
    """
    Uploads stuff to our pusher feed
    Args:
        :data is the JSON about player and bullet locs
    """
    url = "https://api.private-beta-1.pusherplatform.com:443/apps/" + APP_ID + "/feeds/test"
    data = {'items': [item_data]}
    r = requests.post(url, data=json.dumps(data))
    print("Request sent: " + str(r.status_code))
    print(json.dumps(json.loads(r.content.decode()), indent=4))
