from flask import Flask
from flask import request
from flask import Response
from random import randint
from game.game import Game
from game.spacecraft import Spaceship
app = Flask(__name__)

try:
    unicode = unicode
except NameError:
    # 'unicode' is undefined, must be Python 3
    str = str
    unicode = str
    bytes = bytes
    basestring = (str,bytes)
else:
    # 'unicode' exists, must be Python 2
    str = str
    unicode = unicode
    bytes = str
    basestring = basestring

from datetime import timedelta
from flask import make_response, current_app
from functools import update_wrapper


code_user = {}

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/get_code', methods=['POST'])
@crossdomain(origin='*')
def get_code():
    print("This was hit")

    code = request.form.get('code')
    client_id = request.form.get('id')

    if not client_id:
        return Response(status=500)

    if client_id not in code_user:
        new_sc = Spaceship(randint(0, 19), randint(0, 19), game)
        game.players.add(new_sc)
        code_user[client_id] = [code, new_sc]
    else:
        code_user[client_id][0] = code

    return Response(status=200)


@app.route('/scheduler')
def schedule():
    for user in code_user:
        code, sc = code_user[user]
        try:
            exec(code)
            play(sc)
        except Exception as e:
            print(e)
            code = """def play(sc): pass"""
            exec(code)
            code_user[user][0] = code
            continue
        print("here reached " + code)
    game.next_tick()
    return Response(status=200)

game = None

if __name__ == "__main__":
    game = Game(20, 20)
    app.run(debug=True)
