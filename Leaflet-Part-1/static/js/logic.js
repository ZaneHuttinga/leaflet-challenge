// Store the earthquake data API endpoint as queryUrl.
// Note that this data set contains all earthquake data for the past seven days.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// A function to determine the marker size based on the magnitude.
function markerSize(magnitude) {
    return magnitude*20000;
  };

// A function to determine the marker color based on the depth.
function markerColor(coordinates) {
    const depth = coordinates[2];
    if (depth < 10) return "lime";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "gold";
    else if (depth < 90) return "orange";
    else return "red";
  };

// Create the creatureFeatures function. This function places the markers on each location in the dataset.
// Note this function is used in the GET request above.
function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date and time: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Latitude: ${feature.geometry.coordinates[0]}</p><p>Longtitude: ${feature.geometry.coordinates[1]}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    };
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      // Creat the dots indicating the magnitude and depth.
      pointToLayer: function(feature, latlng) {
        return L.circle(latlng, {
          stroke: false,
          fillOpacity: 0.75,
          color: markerColor(feature.geometry.coordinates),
          fillColor: markerColor(feature.geometry.coordinates),
          radius: markerSize(feature.properties.mag)
        });
      }
      
    });
  
    // Send our earthquakes layer to the createMap function.
    createMap(earthquakes);
  };
  
  // Create the createMap function called by createFeatures above.
  // This creates the actual map interface for the user.
  function createMap(earthquakes) {

    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        40, -110
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });

    // Create a div for the legend.
    let legend = L.control({ position: 'bottomright'});
  
    // Add create lists of depths and colors for use in for loop below.
    legend.onAdd = function() {
      let div = L.DomUtil.create('div', 'info legend');
      const depths = [0, 10, 30, 50, 70, 90];
      const colors = ["lime", "greenyellow", "yellow", "gold", "orange", "red"];

      // Add the ID to the div element that will match #legend.
      // This is used in the CSS file to set the background and border of the legend.
      div.id = "legend";
      div.innerHTML +=
          '<b>Depth (km)</b><br>'
      
      // Loop through the depth intervals and create a colored circle for each
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
          '<i class="circle" style="background:' + colors[i] + '"></i> ' +
          (depths[i] === 0 ? 'Less than ' + depths[i + 1] : 
            (depths[i + 1] ? depths[i] + ' - ' + depths[i + 1]: 'Greater than ' + depths[i])) + 
          '<br>';
      };
      // Return the div we have created.
      return div;
    };

    // Add the legend to the map.
    legend.addTo(myMap);
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
}