mapboxgl.accessToken = 'pk.eyJ1IjoibXNwYXJrczcxNCIsImEiOiJjazZsZjl0aXAwYmMzM21uMHpmNjcxMzFoIn0.yMKMcXRxt0QzELn7THF_8g';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-95.303102, 40.832078]
var initialZoom = 3.35

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

        }
      }
    })

    var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-97.5164, 35.4676]
    },
    properties: {
      title: 'Mapbox',
      description: 'Anchorage, AK'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-112.0740, 33.4484]
    },
    properties: {
      title: 'Mapbox',
      description: 'Phoenix, AZ'
    }
  }]
};
{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-118.2437, 34.0522]
  },
  properties: {
    title: 'Mapbox',
    description: 'Los Angeles, California'
  }
}]
};{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-74.0060, 40.7128]
  },
  properties: {
    title: 'Mapbox',
    description: 'NYC, NY'
  }
}]
};{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-149.9003, 61.2181]
  },
  properties: {
    title: 'Mapbox',
    description: 'Oklahoma City, OK'
  }
}]
};
