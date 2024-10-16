# leaflet-challenge
Data Visualization and Analytics Boot Camp Challenge 15

An interactive map showing earthquake data over the past seven days.

## Explanation of code

The file 'index.html' provides the basic HTML structure for the webpage. There is little content here since the entire page consists of the map (<div id="map"></div>). The rest of the HTML is importing d3 and Leaflet and linking to the JavaScript and CSS files.

The JavaScript file ('static/js/logic.js') uses d3 to call the data from the USGS GeoJSON Feed. It then uses Leaflet to create the map. Each dot on the map represents a recorded earthquake in the past seven days. The radius of the dot increases with the magnitude, and the color indicates the depth. In addition, the JavaScript creates a new div with the id "legend" where the colors are explained.

The CSS file ('static/css/style.css') contains a small amount of code to make the map fill the page, and then two items (#legend and #legend .circle) to format the legend. 

## Notes on sources

The source of the earthquake data is the USGS GeoJSON Feed (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

Code for the following were adapted from answers provided by ChatGPT:
1. the 'markerColor' function;
2. the 'pointToLayer' part of the 'earthquakes' variable within the 'createFeatures' function;
3. the for loop within the legend creation.

Additional code for the legend was based on the top answers to the following StackExchange answers:
- https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
- https://stackoverflow.com/questions/53197987/changing-legend-background-color-with-css-javascript

HTML color names were found at w3 schools (https://www.w3schools.com/colors/colors_groups.asp).