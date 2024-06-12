// Create map object
let map = L.map("map", {
    center: [20, -70],
    zoom: 3

  });

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

// Use url to obtain earthquake
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Getting GeoJSON data
d3.json(link).then(function(data) {
    data.features.forEach(function(feature){

        // set the different variables
        let coordinates = feature.geometry.coordinates;
        let magnitude = feature.properties.mag;
        let depth = coordinates[2];
        let radius = magnitude * 3.5;
        let colors = ColorDepth(depth);

        // Create the markers
        let marker = L.circleMarker([coordinates[1],coordinates[0]],{
            radius: radius,
            color: "black",
            opacity: 0.2,
            fillColor: colors,
            fillOpacity: 1,
        }).addTo(map)

        // Add Popup
        marker.bindPopup(`Magnitude: ${magnitude}<br>Location: ${coordinates[1]}, ${coordinates[0]}<br>Depth: ${depth}`);
    });
});

        // Define color function based on depth
    function ColorDepth (depth) {
        if (depth > 90) {
            return "#b30000";
          }
          else if (depth > 70) {
            return "#e34a33";
          }
          else if (depth > 50) {
            return "#fc8d59";
          }
          else if (depth > 30) {
            return "#fdbb84";
          }
          else if (depth > 10) {
            return "#fdd49e";
          }
          else {
            return "#fef0d9";
          }
    }

  // Set up the legend.
  let legend = L.control({position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    let colors = ["#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#e34a33", "#b30000"];
    let labels = ["<10", "10-30", "30-50", "50-70", "70-90", "90<"];

    // Add legend title
    div.innerHTML = "<h4>Earthquake<br> Depth (Km)</h4>";
    
    // Loop through depth ranges and create color boxes with labels
    for (let i = 0; i < colors.length; i++) {
        div.innerHTML += "<div><span style='background-color:" + colors[i] + "'></span><span class='legend-label'>" + labels[i] + "</span></div>";
    };
    return div;
};
  // Add legend to the map
    legend.addTo(map);
