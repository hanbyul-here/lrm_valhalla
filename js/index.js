var map = L.map('map');

var layer = Tangram.leafletLayer({ scene: 'resource/scene.yaml' });
layer.addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(40.75,-73.96),
        L.latLng(40.64,-73.94)
    ],
    routeWhileDragging: true,
    router: L.Routing.valhalla('valhalla-T_YY31g','auto')

}).addTo(map);
