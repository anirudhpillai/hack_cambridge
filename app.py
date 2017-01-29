from flask import Flask
from flask import request
from flask import Response
from random import randint
from game.game import Game
from game.spacecraft import Spaceship
app = Flask(__name__)


code_user = {}


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/get_code', methods=['POST'])
def get_code():
    code = request.form.get('code')
    client_id = request.form.get('id')
    if not client_id:
        return Response(status=500)

    if client_id not in code_user:
        new_sc = Spaceship(randint(0, 19), randint(0, 19), game)
        code_user[client_id] = [code, new_sc]
    else:
        code_user[client][0] = code

    return Response(status=200)


@app.route('/scheduler')
def schedule():
    for user in code_user:
        code, sc = code_user[user]
        try:
            exec(code)
        except Exception as e:
            print(e)
            code = """
def play(sc): pass
            """
            code_user[user][0] = code
            continue

        play(sc)

    game.next_tick()

game = None
if __name__ == "__main__":
    game = Game(20, 20)
    app.run(debug=True)
