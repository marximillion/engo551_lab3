console.log("Success loading .js script");
$(document).ready(function() {
    var myMap = L.map('map').setView([51.0468, -114.0500], 10);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    
}).addTo(myMap);

    var marker = L.marker([51.0468, -114.0500]).addTo(myMap);
});
  




