mapboxgl.accessToken = 'pk.eyJ1IjoibXNwYXJrczcxNCIsImEiOiJjazZsZjl0aXAwYmMzM21uMHpmNjcxMzFoIn0.yMKMcXRxt0QzELn7THF_8g';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-95.303102, 40.832078]
var initialZoom = 3.35

// create an object to hold the initialization options for a mapboxGL map
var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/light-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

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

  // let's make sure the source got added by logging the current map state to the console
    console.log(map.getStyle().sources)

    // add a layer for our custom source
    // Have to include the `stops` key and you can't use the value `null` as one of the stops. Need to use all one type of
    // value, in this case strings.
    map.addLayer({
      id: 'fill-Res',
      type: 'fill',
      source: 'Res',
      paint: {
        'fill-color': {
          type: 'categorical',
          property: 'MAIL_NAME',
          stops:
          ["Coordinates", "#f00"]
        }
      }
    })

    // add an empty data source, which we will use to highlight the lot the user is hovering over
    map.addSource('highlight-feature', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })

})
