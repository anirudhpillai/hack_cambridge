from math import atan2, cos, sin
from .constants import *
import uuid

class Bullet:
    def __init__(self, x, y, dest_x, dest_y):
        self.bullet_id = uuid.uuid5(uuid.NAMESPACE_DNS, 'game')
        self.x = x
        self.y = y
        self.dest_x = dest_x
        self.dest_y = dest_y

    def update_bullet_position(self):
        direction = atan2(-1 * (self.dest_y - self.y), self.dest_x - self.x)
        print("direction = ", direction)
        new_x = self.x + cos(direction) * 10
        new_y = self.y + sin(direction) * 10
        self.x, self.y = new_x, new_y
