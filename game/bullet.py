from math import atan2, cos, sin
from constants import *


class Bullet:
    def __init__(self, x, y, dest_x, dest_y):
        self.bullet_id = uuid.uuid5(uuid.NAMESPACE_DNS, 'game')
        self.x = x
        self.y = y
        self.dest_x = dest_x
        self.dest_y = dest_y

    def update_bullet_psosition(self):
        direction = atan2(-1 * (self.dest_y - self.y), self.dest_x - self.x)
        new_x = x + cos(direction) * BULLET_SPEED * TICK_LENGTH
        new_y = y + sin(direction) * BULLET_SPEED * TICK_LENGTH
        self.x, self.y = new_x, new_y
