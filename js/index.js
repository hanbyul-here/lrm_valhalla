var map = L.map('map',{
  //tangram's inertia doesn't work great with leaflet 0.7
  inertia: false
});
var adds = window.location.href.split('/');
var startPoint;

for(var i = 0; i< adds.length; i++){
  if(adds[i] === '#auto' || adds[i]  === '#bicycle' || adds[i]  === '#pedestrian'){
    startPoint = i;
    break;
  }
}

var hashTransitMode = adds[startPoint];
var startLat = adds[startPoint+1];
var startLng = adds[startPoint+2];
var destLat = adds[startPoint+3];
var destLng = adds[startPoint+4];


var rr = L.Routing.control({
  routeWhileDragging: false,
  router: L.Routing.valhalla('valhalla-T_YY31g','auto'),
  summaryTemplate:'<div class="start">{name}</div><div class="info {transitmode}">{distance}, {time}</div>',
  createMarker: function(i,wp,n){
    var iconV;
      if(i ==0){
          iconV = L.icon({
            iconUrl: 'dot.png',
            iconSize:[24,24]
          });
        }else{
          iconV = L.icon({
            iconUrl: 'dot.png',
            iconSize:[24,24]
          })
        }
        var options = {
          draggable: true,
          icon: iconV
        }
        return L.marker(wp.latLng,options);
      },
      pointMarkerStyle: {radius: 6,color: '#25A5FA',fillColor: '#FFDA8A',opacity: 1,fillOpacity: 1}}).addTo(map);

var layer = Tangram.leafletLayer({ scene: 'scene.yaml' });
layer.addTo(map);

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