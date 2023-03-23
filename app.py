# postgresql://postgres:23081201@localhost/engo551_lab3
import os
import csv
import requests
import json

from flask import jsonify, abort, Flask, session, render_template, request, redirect, url_for
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.exc import IntegrityError
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap

#bootstrap = Bootstrap()
db = SQLAlchemy()

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
# db = scoped_session(sessionmaker(bind=engine))

app = Flask(__name__)

bootstrap = Bootstrap(app)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'Thisissupposedtobesecret!'
db.init_app(app)
Session(app)


@app.route("/", methods=['GET'])
def main():
    return render_template("index.html")


@app.route("/api", methods=["GET", "POST"])
def api():

    #fullcode = code.zfill(10)
    # print(fullcode)
    res = requests.get("https://data.calgary.ca/resource/c2es-76ed.geojson")

    #data = res.json()
    #data_str = json.dumps(data, indent=4)

    return render_template("api.html", data=res.text)


@app.route('/search', methods=["GET", "POST"])
def search():
    start_date = request.form.get('start_date')
    end_date = request.form.get('end_date')
    # url = f'https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate > '{start_date}' and issueddate < '{end_date}'&$select=issueddate,workclassgroup,contractorname,communityname,originaladdress,latitude,longitude'
    url = f'https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate > "{start_date}" and issueddate < "{end_date}"&$select=issueddate,workclassgroup,contractorname,communityname,originaladdress,latitude,longitude'
    response = requests.get(url)
    data = response.json()
    return render_template("search.html", data=data)


@app.route('/mapbox', methods=["GET", "POST"])
def mapbox():
    return render_template("mapbox.html")


@app.route('/lab5', methods=["GET", "POST"])
def lab5():
    return render_template("lab5-zifan.html")


if __name__ == 'main':
    app.run(debug=True)
