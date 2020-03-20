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
          stops:[
          ["IND_NAME", '#F0F']
        ]
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


      //add source
      map.addSource('cities.geojson', {
        type: 'geojson',
        data: 'data/cities.geojson'
      });

  //add each city as a sprite
  map.on('load', function() {
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
          'coordinates':
            [-97.5164, 35.4676]
      },
      'properties': {
        'title': 'Oklahoma City',
        'icon': 'monument'
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
            'icon': 'airport'
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
                'icon': 'bicycle'
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
                    'icon': 'airport'
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
    });

    // event listeners for the fly to buttons

    $('#oklahomacity').on('click', function() {
      map.flyTo({
        center: [-97.5164, 35.4676],
        zoom: initialZoom
      })
    })

    $('#nyc').on('click', function() {

      var nycLngLat = [-74.006, 40.7128]

      map.flyTo({
        center: nycLngLat,
        zoom: initialZoom
      })
    })

    $('#phoenix').on('click', function() {
      var phoenixLngLat = [-112.074,	33.4484]

      map.flyTo({
        center: phoenixLngLat,
        zoom: initialZoom
      })
    })
    $('#losangeles').on('click', function() {
      var losangelesLngLat = [-118.2437,34.0522]

      map.flyTo({
        center: losangelesLngLat,
        zoom: initialZoom
      })
    })
    $('#anchorage').on('click', function() {
        var anchorageLngLat = [-149.003,61.2181]

        map.flyTo({
          center: anchorageLngLat,
          zoom: initialZoom
        })
      })

  })
