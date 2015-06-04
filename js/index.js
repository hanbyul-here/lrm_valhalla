var map = L.map('map',{
  //tangram's inertia doesn't work great with leaflet 0.7
  inertia: false
});


var layer = Tangram.leafletLayer({
  scene: 'resource/scene.yaml',
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
});

layer.addTo(map);

var hash = window.location.hash ;

var hashes = hash.split('/')

var hashTransitMode = hashes[0];
var startLat = hashes[1];
var startLng = hashes[2];
var destLat = hashes[3];
var destLng = hashes[4];


var rr = L.Routing.control({
  routeWhileDragging: false,
  router: L.Routing.valhalla('valhalla-Mc6zgDA','auto'),
  summaryTemplate:'<div class="start">{name}</div><div class="info {transitmode}">{distance}, {time}</div>',
  createMarker: function(i,wp,n){
    var iconV;
      if(i ==0){
          iconV = L.icon({
            iconUrl: 'resource/dot.png',
            iconSize:[24,24]
          });
        }else{
          iconV = L.icon({
            iconUrl: 'resource/dot.png',
            iconSize:[24,24]
          })
        }
        var options = {
          draggable: true,
          icon: iconV
        }
        return L.marker(wp.latLng,options);
      },
      formatter: new L.Routing.Valhalla.Formatter(),
      pointMarkerStyle: {radius: 6,color: '#25A5FA',fillColor: '#FFDA8A',opacity: 1,fillOpacity: 1}}).addTo(map);




if(!hashTransitMode){

  hashTransitMode = 'auto';
  startLat = 40.645244;
  startLng = -73.9449975;
  destLat = 40.7590615;
  destLng = -73.969231;

}else{
  hashTransitMode = hashTransitMode.replace("#","");
}

rr.setWaypoints([L.Routing.waypoint(L.latLng(startLat,startLng)),L.Routing.waypoint( L.latLng(destLat,destLng))]);
rr.route({transitmode: hashTransitMode});

var driveBtn = document.getElementById("drive_btn");
var bikeBtn = document.getElementById("bike_btn");
var walkBtn = document.getElementById("walk_btn");
var relocateBtn  = document.getElementById("relocate_btn");

var mobileRouteEL = document.createElement('div');

mobileRouteEL.className = 'mobile-route';
mobileRouteEL.classList.add('show-route');
mobileRouteEL.addEventListener('click', function (e) {

var routingContainer = document.getElementsByClassName('leaflet-routing-container')[0];
      if(routingContainer.classList.contains('left-align')){
        routingContainer.classList.remove('left-align');
        mobileRouteEL.classList.add('show-route');
        mobileRouteEL.classList.remove('hide-route');
      }else{
        routingContainer.classList.add('left-align');
        mobileRouteEL.classList.remove('show-route');
        mobileRouteEL.classList.add('hide-route');
      }
    });

document.body.appendChild(mobileRouteEL);




driveBtn.addEventListener('click', function (e) {
  hashTransitMode = 'auto';
  rr.route({transitmode: hashTransitMode});
});

bikeBtn.addEventListener('click', function (e) {
  hashTransitMode = 'bicycle';
  rr.route({transitmode: hashTransitMode});
});

walkBtn.addEventListener('click', function (e) {
  hashTransitMode = 'pedestrian';
  rr.route({transitmode: hashTransitMode});
});

relocateBtn.addEventListener('click', function (e) {
  startLat = map.getCenter().lat;
  startLng = map.getCenter().lng;

  destLat = startLat + 0.001;
  destLng = startLng + 0.001;
  
  var newWayPoints = [L.Routing.waypoint(L.latLng(startLat, startLng)),L.Routing.waypoint(L.latLng(destLat, destLng))];
  rr.setWaypoints(newWayPoints);
  rr.route();

});


function changeURL(transitM,startLat,startLng,destLat,destLng){

  window.history.replaceState({}, "Title", '/#' + transitM + '/' + startLat + '/' + startLng + '/' + destLat + '/' + destLng);
}