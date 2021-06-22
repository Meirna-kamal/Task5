from flask import Flask, jsonify, request, render_template
import json, cmath
from flask_cors import CORS
from FreqResponse import *

app = Flask(__name__)
CORS(app)
app.debug = True


@app.route("/", methods=["GET"])
def index():

    return render_template("index.html")


@app.route("/draw_Mag_and_Phase")
def draw_Mag_and_Phase():

    data = json.loads(request.args.get("data"))
    zeros, poles = [], []
    for zero in data["zeros"]:
        zeros.append(zero[0] + zero[1] * 1j)

    for pole in data["poles"]:
        poles.append(pole[0] + pole[1] * 1j)

    (
        frequencies,
        magnitude,
        phase_before_filter,
        phase_after_filter,
    ) = calculate_frq_response(zeros, poles, a = data["a"])

    data = {
        "frequencies": frequencies.tolist(),
        "magnitude": magnitude.tolist(),
        "phase_before_filter": phase_before_filter.tolist(),
        "phase_after_filter": phase_after_filter.tolist(),
    }

    return jsonify(data)
