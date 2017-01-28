import uuid
import json


class Game:
    def __init__(self, width, height):
        self.players = set([])
        self.bullets = set([])
        self.width = width
        self.height = height

    def get_locations(self):
        return [(k.x, k.y) for k in self.players]

    def add_bullet(self, x, y, dest_x, dest_y):
        new_bullet = Bullet(x, y, dest_x, dest_y)
        self.bullets.add(new_bullet)

    def next_tick(self):
        for bullet in self.bullets:
            if not (0 <= bullet.x <= self.width and
                    0 <= bullet.y <= self.height):
                self.bullets.remove(bullet)
                continue
            bullet.update_bullet_psosition()

        for player in self.players:
            if (player.x, player.y) in
            set([(k.x, k.y) for k in self.bullets]):
                self.players.remove(player)

        return get_frontend_data()

    def get_frontend_data(self):
        pls = []
        for player in self.players:
            pls.append({
                "id": str(player.player_id),
                "x": player.x,
                "y": player.y
            })

        bls = []

        for bullet in self.bullets:
            bls.append({
                "id": str(bullet.bullet_id),
                "x": x,
                "y": y
            })

        return json.dumps({"bullets": bls, "players": pls})
