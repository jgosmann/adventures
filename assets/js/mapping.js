import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerRetinaIcon from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import leaflet from 'leaflet'
import 'leaflet.geodesic'

// FIXME allow for prefix, is there in general a better solution?
const DefaultIcon = L.icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: '/' + markerRetinaIcon,
  iconSize: [25, 41],
  iconUrl: '/' + markerIcon,
  shadowSize: [41, 41],
  shadowUrl: '/' + markerShadow,
  tooltipAnchor: [16, -28]
});

L.Marker.prototype.options.icon = DefaultIcon;

const initMap = (targetId) => {
  const map = leaflet.map(targetId, {
    dragging: !L.Browser.mobile,
    tap: !L.Browser.mobile,
    scrollWheelZoom: false
  });

  leaflet.tileLayer(
    'https://api.mapbox.com/styles/v1/jgosmann/cjtlceqtm0xh71fnkgt3725ou/' +
      'tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
    {
      attribution: 'Map data &copy; ' +
        '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> ' +
        'contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">' + 
        'CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoiamdvc21hbm4iLCJhIjoiY2p0a2pnbGRmM2JlMDQzbzlzdW' +
        'trYjZiOSJ9.u2TRWUpD5guUay3Nn_Twiw'
    }
  ).addTo(map);

  return map;
}

const showGpxTrack = (targetId, trackUrl, onlySegments) => {
  const map = initMap(targetId);
  const req = new XMLHttpRequest();
  req.addEventListener('load', () => {
    const segments = req.responseXML.getElementsByTagName('trkseg');
    let bounds = null;
    for (let i = 0; i < segments.length; ++i) {
      if (onlySegments) {
        if (!onlySegments.includes(i)) {
          continue;
        }
      }
      const segment = segments[i];

      var path = [];
      for (let point of segment.getElementsByTagName('trkpt')) {
        path.push([point.getAttribute('lat'), point.getAttribute('lon')]);
      }

      const polyline = L.polyline(path, {color: '#dd16c9'}).addTo(map);
      if (bounds) {
        bounds.extend(polyline.getBounds());
      } else {
        bounds = polyline.getBounds();
      }
    }
    map.fitBounds(bounds);
  });
  req.open('GET', trackUrl);
  req.send();
}

const showLocation = (targetId, latLng, zoomLevel) => {
  const map = initMap(targetId);
  if (zoomLevel) {
    map.setView(latLng, zoomLevel);
  } else {
    const munich = [48.1384, 11.5683];
    map.fitBounds([munich, latLng], {padding: [50, 150]});
  }

  leaflet.marker(latLng).addTo(map);
}

const showRoute = (targetId, routeLatLng) => {
  const map = initMap(targetId);
  const route = L.geodesic([], {steps: 50, color: '#d43c31'}).addTo(map);
  route.setLatLngs([routeLatLng]);
  map.fitBounds(route.getBounds(), {padding: [50, 50]});
}


const Load = () => {
  const locations = document.querySelectorAll('.loc');
  for (let loc of locations) {
    showLocation(
      loc.getAttribute('id'),
      [Number(loc.getAttribute('data-lat')), Number(loc.getAttribute('data-long'))],
      loc.getAttribute('data-zoom')
    );
  }

  const tracks = document.querySelectorAll('.gpx');
  for (let track of tracks) {
    showGpxTrack(track.getAttribute('id'), track.getAttribute('data-src'));
  }

  const routes = document.querySelectorAll('.route');
  for (let route of routes) {
    showRoute(route.getAttribute('id'), JSON.parse(route.getAttribute('data-route')));
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('load', Load);
} else {
  Load();
}
