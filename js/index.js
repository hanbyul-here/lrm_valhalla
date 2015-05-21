var map = L.map('map');

var layer = Tangram.leafletLayer({ scene: 'resource/scene.yaml' });
layer.addTo(map);

var rr = L.Routing.control({
    waypoints: [
        L.latLng(40.645244,-73.9449975),
        L.latLng(40.7590615,-73.969231)
    ],
    routeWhileDragging: false,
    router: L.Routing.valhalla('valhalla-T_YY31g','pedestrian')

}).addTo(map);

var bikeBtn = document.getElementById("bike_btn");
var walkBtn = document.getElementById("walk_btn");


bikeBtn.addEventListener('click', function (e) {
  rr.route({transitmode: 'bicycle'});
});
walkBtn.addEventListener('click', function (e) {
  rr.route({transitmode: 'pedestrian'});
});