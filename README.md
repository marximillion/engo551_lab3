# Lab 1

```

ENGO 551

Creators: Mark De Guzman
Tyson Toews

IMPORTANT:
On first time run through of the application, follow these steps carefully:

In the terminal run the following commands:
python install -r requirements.txt
set FLASK_DEBUG=1
set DATABASE_URL=postgresql://<user>:<password>@localhost/<database_name>

Once these steps have been followed, the application should run smoothly.

Description [Lab 3]:
Initial Leaflet Application Completed - 03/03/2023

The main purpose of this lab assignment is to gain familiarity with geojson file types, javascript programming language, and more importantly the javascript extension leaflet.js

For this lab, basic map functionality was achieved by successfully loading a map into an html file. On top of basic map functions, users are also able to specify a start and end date in wich they want to query for building permits within the geojson file. Various extensions within leaflet were used such:
- daterangepicker: to be able to specify a specific date period
- moment: to be able to format the specified dates into a desired format
- jquery: to be able to perform search queries within a geojson data structure
- markercluster: to be able to visualize data in a presentable manner

With these following extensions users are able to perform a search query, identify the different areas where a building permit exists, differentiate overlapping markers, and visualize the map in an aesthetically pleasing manner in all zoom levels.


*Folder items
/static
.png files : images for all the icons used
script.js : main javascript code to be executed for proper application functionality
styles.css : css code for styling of the html pages

/templates
api.html : html code to show entire json data being used from the api 
base.html : html template for general layout of the website
index.html : html code for the main landing page of the website
search.html : html code for leaflet map queries and building permits search


/
app.py : main python flask application code for routes, etc.


```