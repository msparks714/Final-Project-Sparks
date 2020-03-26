mapboxgl.accessToken = 'pk.eyJ1IjoibXNwYXJrczcxNCIsImEiOiJjazZsZjl0aXAwYmMzM21uMHpmNjcxMzFoIn0.yMKMcXRxt0QzELn7THF_8g';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-106.8175, 39.1911];
var initialZoom = 3.25;

// create an object to hold the initialization options for a mapboxGL map
var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/light-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
};

// create the new map
var map = new mapboxgl.Map(initOptions);

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
map.on('style.load', function() {
  //add a layer for your custom source//
  map.addSource('Res', {
    type:'geojson',
    data:'data/Res.geojson',
  });

  // add a layer for our custom source
  // Have to include the `stops` key and you can't use the value `null` as one of the stops. Need to use all one type of
  // value, in this case strings.
  map.addLayer({
    id: 'fill-Res',
    type: 'fill',
    source: 'Res',
    paint: {
      'fill-color': "#760505",
      'fill-opacity': 0.8
    }
  });
map.setPaintProperty('water','fill-color', '#9CC6D2')


  //add each city as a sprite
  map.addSource('points', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          // feature for OKC
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-97.5164, 35.4676]
           },
          'properties': {
            'title': 'Oklahoma City',
            'icon': 'viewpoint'
          }
        },
        {
          // feature for NYC
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-74.006,	40.7128]
          },
          'properties': {
            'title': 'NYC',
            'icon': 'harbor'
          }
        },
        {
          // feature for Anchorage
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-149.003,	61.2181]
          },
          'properties': {
            'title': 'Anchorage',
            'icon': 'park'
          }
        },
        {
          // feature for Phoenix
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-112.074,	33.4484]
          },
          'properties': {
            'title': 'Phoenix',
            'icon': 'volleyball'
          }
        },
        {
          // feature for Los Angeles
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-118.2437,	34.0522]
          },
          'properties': {
            'title': 'Los Angeles',
            'icon': 'fire-station'
          }
        }
      ]
    }
  });

  map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'points',
    'layout': {
      // get the icon name from the source's "icon" property
      // concatenate the name to get an icon from the style's sprite sheet
      'icon-image': ['concat', ['get', 'icon'], '-15'],
      // get the title name from the source's "title" property
      'text-field': ['get', 'title'],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top'
    }
  });

  // event listeners for the fly to buttons
  $('#oklahomacity').on('click', function() {
    map.flyTo({
      center: [-97.5164, 35.4676],
      zoom: 10
    });
  });

  $('#nyc').on('click', function() {
    var nycLngLat = [-74.006, 40.7128]
    map.flyTo({
      center: nycLngLat,
      zoom: 10
    });
  });

  $('#phoenix').on('click', function() {
    var phoenixLngLat = [-112.074, 33.4484]
    map.flyTo({
      center: phoenixLngLat,
      zoom: 10
    });
  });

  $('#losangeles').on('click', function() {
    console.log('Clicked LA')
    var losangelesLngLat = [-118.2437, 34.0522]
    map.flyTo({
      center: losangelesLngLat,
      zoom: 10
    });
  });

  $('#anchorage').on('click', function() {
    var anchorageLngLat = [-149.003, 61.2181]
    map.flyTo({
      center: anchorageLngLat,
      zoom: 10
    });
  });

//sidebar hide
$('sidebar').click(function(){
  $('sidebar').toggleClass('active');
});

// When a click event occurs on a feature in the res layer, open a popup at the
// location of the click, with description HTML from its properties.
map.on('mouseenter', 'res-layer', function(e) {
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML(e.features[0].properties.IND_NAME)
.addTo(map);
});
// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'res-layer', function() {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'res-layer', function() {
map.getCanvas().style.cursor = '';
});
})

map.on('load', function() {
map.addSource('ms', {
  'type': 'geojson',
  'data': {
      'type': 'FeatureCollection',
        'features': [
        {
            'type': 'Feature',
            'properties': {
              'description':

map.on('click', 'places', function(e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.description;
})

  // iterate over each object in cities.geojson
  citydata[0].features.forEach(function(data){
    console.log(data);
    // for each object in the cities, add a popup to the map
    new mapboxgl.Marker().setLngLat(data.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setText(`${data.properties.Geography} has ${data.properties.Estimate_Total_Residents} total residents and ${data.properties.field_7} of them are Native American.
             That is roughly ${data.properties.entire_state_percent} of all residents in their state.`))
      .addTo(map);
  }
