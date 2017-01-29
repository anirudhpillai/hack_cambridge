import uuid
import json
from .pusher import upload_item


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
        bls = []
        for bullet in self.bullets:
            if not (0 <= bullet.x <= self.width and
                    0 <= bullet.y <= self.height):
                bls.append({
                    "id": str(bullet.bullet_id),
                    "x": x,
                    "y": y,
                    "destroyed": True
                })
                self.bullets.remove(bullet)
                continue
            bullet.update_bullet_psosition()

        pls = []
        for player in self.players:
            if (player.x, player.y) in \
            set([(k.x, k.y) for k in self.bullets]):
                pls.append({
                    "id": str(player.player_id),
                    "x": player.x,
                    "y": player.y,
                    "destroyed": True
                })
                self.players.remove(player)

        return upload_item(get_frontend_data(pls, bls))

    def get_frontend_data(self, pls, bls):
        for player in self.players:
            pls.append({
                "id": str(player.player_id),
                "x": player.x,
                "y": player.y,
                "destroyed": False
            })

        for bullet in self.bullets:
            bls.append({
                "id": str(bullet.bullet_id),
                "x": x,
                "y": y,
                "destroyed": False
            })

        return {"bullets": bls, "players": pls}
