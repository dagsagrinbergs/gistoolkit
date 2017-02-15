function makeMap() {
  var Stamen_Watercolor, baseMaps, drawControl, drawnItems, map, opencyclemap, osm, otm, overlayMaps, geojsonLayer, file;
  map = L.map("map").setView([56.9558, 24.0991], 13);

  osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  otm = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  Stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 1,
    maxZoom: 16,
    ext: 'png'
  });

  opencyclemap = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  baseMaps = {
    "OpenStreetMap": osm,
    "OpenTopoMap": otm,
    "Stamen watercolor": Stamen_Watercolor,
    "No map": opencyclemap
  };
  overlayMaps = null;
  L.control.layers(baseMaps, overlayMaps).addTo(map);

  L.control.scale().addTo(map);

  drawnItems = L.featureGroup().addTo(map);

  drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems
    },
    draw: {
      polygon: {
        allowIntersection: false,
        showArea: true
      },
      polyline: true,
      imperial: false,
      showMeasurements: true,
      rectangle: true,
      circle: true,
      marker: true
    }
  }).addTo(map);

  map.on('draw:created', function(e) {
    drawnItems.addLayer(e.layer);
  });

  geojsonLayer = L.geoJSON().addTo(map);

  /*
    function getDrawnItems() {
      var json = drawnItems.toGeoJSON();
      return json;
    };
  */

  /*
    uploadPopup = L.popup().setContent('<label for="input">Select a zipped shapefile:</label> <input type="file" id="file"> <br> <input type="submit" id="submit"> <span id="warning"  style="color:red"></span>');

    return L.easyButton('fa fa-upload', function(btn, map) {
      uploadPopup.setLatLng(map.getCenter()).openOn(map);
    }).addTo(map);
  */

  document.getElementById('export').onclick = function(e) {
    // Extract GeoJson from featureGroup
    var data = drawnItems.toGeoJSON();

    // Stringify the GeoJson
    var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    // Create export
    document.getElementById('export').setAttribute('href', 'data:' + convertedData);
    document.getElementById('export').setAttribute('download','data.geojson');
  }

  document.getElementById('import').onclick = function(e) {
    // Get file

    // Convert back; unstringify
    var data =
    // Create import

  }
};

/*
window.onload = function() {
  var convertToLayer, handleZipFile;
  handleZipFile = function(file) {
    var reader;
    reader = new FileReader;
    reader.onload = function() {
      if (reader.readyState !== 2 || reader.error) {
        return;
      } else {
        convertToLayer(reader.result);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  convertToLayer = function(buffer) {
    shp(buffer).then(function(geojson) {
      var layer;
      layer = L.shapefile(geojson);
      featureGroup.addLayer(layer);
    });
  };
  $(document).ready(function() {
    $("#submit").click(function() {
      var file, files;
      files = document.getElementById('file').files;
      if (files.length === 0) {
        return;
      }
      file = files[0];
      if (file.name.slice(-3) !== 'zip') {
        document.getElementById('warning').innerHTML = 'Select .zip file';
        return;
      } else {
        document.getElementById('warning').innerHTML = '';
        handleZipFile(file);
      }
    });
  });
};


// ---
// generated by coffee-script 1.9.2

*/
