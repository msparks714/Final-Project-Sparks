mapboxgl.accessToken = 'pk.eyJ1IjoibXNwYXJrczcxNCIsImEiOiJjazZsZjl0aXAwYmMzM21uMHpmNjcxMzFoIn0.yMKMcXRxt0QzELn7THF_8g';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-107.3940, 30.1911];
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
    'id': 'citydata',
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


// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'fill-Res', function() {
map.getCanvas().style.cursor = 'pointer';
});

var popup = new mapboxgl.Popup()
// When a click event occurs on a feature in the cities layer, open a popup at the
// location of the click, with description HTML from its properties.
map.on('mouseenter', 'fill-Res', function(e) {
  popup
  .setLngLat(e.lngLat)
  .setHTML(`
    <div>
    <p><h2>${e.features[0].properties.IND_NAME}</h2></p>
    <p>Total population is ${e.features[0].properties.POP_TOT}</p>
    </div>
    `)
  .addTo(map);
});
//credit: https://aquoid.com/2010/05/building-a-dynamic-tabbed-sidebar-using-jquery//
$j = jQuery.noConflict();
$j('.sidebar-tab .sidebar-tab-content').each(function() {
    var parentId = this.parentNode.id;
    var parentClass = this.parentNode.className;
    parentClass = parentClass.substring(12);
    $j(this).addClass('sidebar-tab-content-' + parentId);
    $j(this).addClass(parentClass);
    $j(this).appendTo(this.parentNode.parentNode.parentNode);
});
$j('.tabbed-sidebar ul.sidebar-tabs a').each(function() {
    var parentId = this.parentNode.id;
    $j(this).addClass(parentId);
});
$j('div.tabbed-sidebar ul.sidebar-tabs li:first').addClass('sidebar-tab-first');
$j('div.tabbed-sidebar div.sidebar-tab-content:first').addClass('sidebar-tab-content-first');
$j('div.tabbed-sidebar div.sidebar-tab-content').hide()
$j('div.sidebar-tab-content-first').show();
$j('div.tabbed-sidebar ul.sidebar-tabs li.sidebar-tab-first a').addClass('tab-current');
$j('div.tabbed-sidebar ul.sidebar-tabs li a').click(function(){
    $j(this).removeClass('tab-current');
    var thisClass = this.className.substring(12, this.className.length);
    var parentId = this.parentNode.parentNode.parentNode.id;
    $j('#' + parentId + '.tabbed-sidebar div.sidebar-tab-content').hide();
    $j('#' + parentId + '.tabbed-sidebar div.sidebar-tab-content-' + thisClass).show();
    $j('#' + parentId + '.tabbed-sidebar ul.sidebar-tabs li a').removeClass('tab-current');
    $j(this).addClass('tab-current');
})


});
