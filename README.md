Leaflet Routing Machine / Valhalla by Mapzen
================================

Extends [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine) with support for [Mapzen's open source routing engine Valhalla](https://github.com/valhalla)

You can use Valhalla routing machine with Leaflet Routing Machine plugin by replacing Router and Formatter instance. 

    var rr = L.Routing.control({
      // you would need to get api key from Mapzen developer (https://mapzen.com/developers)
      router: L.Routing.valhalla('valhalla-nsDITYA','auto'),
      formatter: new L.Routing.Valhalla.Formatter()
    }).addTo(map);


You can change transitmode for routing later by passing the options.

     rr.route({transitmode: hashTransitMode});