// Store API endpoint

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create the map object with options.
let mymap = L.map("map", {
    center: [39.828300, -98.579500],
    zoom: 4,
});

// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

// Create a function that returns the color of the EQ marker based on depth (magnitude)
function chooseColor(depth) {
    if (depth > 90) return "#800026";
    else if (depth > 70) return "#BD0026";
    else if (depth > 50) return "#E31A1C";
    else if (depth > 30) return "#FC4E2A";
    else if (depth > 10) return "#FD8D3C";
    else return "#FEB24C";
}

d3.json(url).then(function (response) {

    console.log(response);
    
    L.geoJson(response, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, 
                {radius : feature.properties.mag * 3,
                opacity: 1,
                fillOpacity: 1,
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: chooseColor(feature.geometry.coordinates[2])
                }
                ).bindPopup(`<p>Magnitude and Location: </p><h3>${feature.properties.title}</h3><br>
                <p>Depth: </p><h4>${feature.geometry.coordinates[2]}</h4>`);
        }    
    }).addTo(mymap);
    // Add circles to the map.

    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: #FEB24C"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background: #FD8D3C"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background: #FC4E2A"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background: #E31A1C"></i><span>50 - 70</span><br>';
        div.innerHTML += '<i style="background: #BD0026"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background: #800026"></i><span>>90</span><br>';
   

    return div;
    };

    legend.addTo(mymap);

});