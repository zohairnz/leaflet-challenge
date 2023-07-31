# leaflet-challenge

In this challenge, we were tasked with creating a mapping visualization of all the earthquakes in the past week using the geoJSON provided by USGS. The mapping tool we used was leaflet.

The following files are in this repository:
1. index.html: this file is called to direct the user to a leaflet map of all the earthquakes recorded by USGS in the past week.
2. style.css: this file contains the styling elements for the map and legend displayed.
3. logic.js: this file has the javascript code that:
      - extracts data from the USGS geoJSON
      - creates a marker for each earthquake, with the marker size and color varying depending on the magnitude/depth of the earthquake
