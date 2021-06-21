from flask import Flask, jsonify, request, render_template
import os, json
from flask_cors import CORS
from magPhase import *

app = Flask(__name__)
CORS(app)
app.debug = True


@app.route("/", methods=["GET"])
def index():

    return render_template("index.html")


@app.route("/draw_Mag_and_Phase")
def draw_Mag_and_Phase():

    data = json.loads(request.args.get("data"))
    print(data["zeros"])
    print(data["poles"])
    b, a = signal.zpk2tf(data["zeros"], data["poles"], 1)
    print(b)
    print(a)
    w, h = signal.freqz(b, a)

    print("a7a")
    return jsonify(w)
