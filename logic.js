// GeoJSON url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the GeoJSON URL
d3.json(url, function(data) {
    // Send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Bind a popup with the place and time to each earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3>");
    };

    // Create a GeoJSON layer with the features array from earthquakeData
    // Run onEachFeature for each feature contained in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define Street Map and Dark Map layers
    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZ3JlZW53b29kZ2lhbnQiLCJhIjoiY2pneWF0bTl2MDFyYzMzcDQ5eDBodWNqbyJ9.E_FrQUaRPFEm7eAIIS1Tvg");
    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZ3JlZW53b29kZ2lhbnQiLCJhIjoiY2pneWF0bTl2MDFyYzMzcDQ5eDBodWNqbyJ9.E_FrQUaRPFEm7eAIIS1Tvg");

    // Define object to hold Base Layers
    var baseMaps = {
        "Street Map": streetMap,
        "Dark Map": darkMap
    };

    // Define object to hold Overlay Layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create Map, displaying streetMap and earthquakes layers on load
  var myMap = L.map("map", {
    center: [
      41.03, -112.21
    ],
    zoom: 5,
    layers: [streetMap, earthquakes]
  });

  // Create a layer control between baseMaps and overlayMaps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}