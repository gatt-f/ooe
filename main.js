let ooe = {
    lat: 48.1,
    lng: 13.8,
    title: "OOE"
};

let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [ooe.lat, ooe.lng],
    zoom: 9,
    layers: [
        startLayer
    ],
});

let layerControl = L.control.layers({
    "BasemapAT Grau": startLayer,
    "Basemap Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "Basemap High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "Basemap Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "Basemap Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "Basemap Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "Basemap Beschriftung": L.tileLayer.provider("BasemapAT.overlay"),
    "Basemap mit Orthofoto und Beschriftung": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay"),
    ])
}).addTo(map);

// Maßstab hinzufügen
L.control.scale({
    imperial: false,
}).addTo(map);

let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT"), {
        toggleDisplay: true
    }
).addTo(map);

// geojson laden und anzeigen
async function loadBorders(url) {
    let response = await fetch(url);
    let geojson = await response.json();
    console.log('Geojson borders: ', geojson);
    L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
            console.log("Feature: ", feature);
            layer.bindPopup(`<h4>${feature.properties.VIERTEL_NA}</h4>`)
        },
    }).addTo(map);
}
loadBorders("data/viertelgrenzen.geojson");