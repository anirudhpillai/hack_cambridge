

class Game:
    def __init__(self):
        self.players = []  # list of spaceships
        self.bullets = {}

    def get_locations(self):
        """Get list of locations for each player"""
        return [player.own_location() for player in self.players]

    def add_bullet(self, x, y):
        """Adds a bullet which the player wants to fire"""
        self.bullet[(x, y)] = True

    def run_tick():
        """
        Runs a `tick` in the game, which is just one round of bullets firing
        """
        remaining_players = []

        for player in self.players:
            if player.own_location() not in self.bullets:
                remaining_players.append(player)

        self.players = remaining_players
        self.bullet = {}
