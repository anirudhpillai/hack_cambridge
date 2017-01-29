import uuid
from .constants import *


class Spaceship:
    def __init__(self, x, y, game):
        self.player_id = uuid.uuid5(uuid.NAMESPACE_DNS, 'game')
        self.x = x
        self.y = y
        self.game = game

    def own_location(self):
        return (self.x, self.y)

    def get_all_locations(self):
        return game.get_locations()

    def fire(self, x, y):
        curr_x, curr_y = self.own_location()
        game.add_bullet(curr_x, curr_y, x, y)
