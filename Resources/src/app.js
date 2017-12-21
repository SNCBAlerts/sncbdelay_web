// Initialize leaflet.js
var L = require('leaflet');

function SNCBAlerts() {
  var transport;

  if (window.WebSocket){
    transport = SNCBAlerts.WebSocket;
  }

  transport.setup.call(this);
  this.subscribe = transport.subscribe;
  this.publish = transport.publish;
}

SNCBAlerts.WebSocket = {
  setup: function(){
    this.socket = new WebSocket('wss://irailnode.herokuapp.com');
  },
  subscribe: function(callback){
    this.socket.onmessage = function(event){
      callback(JSON.parse(event.data));
    }
  },
  publish: function(data){
    this.socket.send(JSON.stringify(data));
  }
};

var map = L.map('map').setView([50.8503, 4.3517], 8);

// Initialize the base layer
L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

var markers = [];

var client = new SNCBAlerts();

client.subscribe(function(data) {
  if (typeof markers[data.id] !== 'undefined') {
    if (markers[data.id].sha1 !== data.sha1) {
      map.removeLayer(markers[data.id].marker);
      delete markers[data.id];
    }
  }

  if (typeof markers[data.id] === 'undefined') {
    markers[data.id] = {
      sha1: data.sha1,
      marker: L.circleMarker(data.coords, data.marker.options).addTo(map).bindPopup(data.marker.content)
    };
  }
});
