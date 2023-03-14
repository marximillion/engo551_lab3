console.log("Success loading .js script");
$(document).ready(function () {
  var map = L.map("map").setView([51.0447, -114.0719], 10);

  var myStyle = {
    color: "#ff7800",
    weight: 5,
    opacity: 0.65,
  };

  var cityHall = L.icon({
    iconUrl: "static/city-hall-icon.png",
    iconSize: [50, 50],
    iconColor: "blue",
  });

  var baseLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }
  ).addTo(map);

  L.marker([51.0447, -114.0719], { icon: cityHall })
    .addTo(map)
    .bindPopup(
      "This marker indicates Calgary's City Hall, located at: 800 Macleod Trail SE, Calgary, AB T2G 5E6"
    )
    .openPopup();
  //.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

  const form = document.getElementById("dates");

  var mapbox1 = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "zifanzhang12345/clezxrw8c000401qm3j7rnuda", // Replace with your own Mapbox style ID
      accessToken:
        "pk.eyJ1IjoiemlmYW56aGFuZzEyMzQ1IiwiYSI6ImNsZXo0aWt6bDBvajIzeG8wdHFjYmZydzgifQ.14P31UjREuVFl0CfgVeBLg",
    }
  ).addTo(map);

  var mapbox2 = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "ttoews45/cleuc9bej000f01p5r173pdy8", // Replace with your own Mapbox style ID
      accessToken:
        "pk.eyJ1IjoidHRvZXdzNDUiLCJhIjoiY2xldWJ5MjQwMDZkNzNxcnRuZHd5eXpqOSJ9.vxwK3vw-CjJH5GF9ihrpsg&zoomwheel=true&fresh=true#9.88/51.0167/-114.0239",
    }
  ).addTo(map);

  var baseLayers = {
    "Bulding Permits": baseLayer,
    "Mapbox 1": mapbox1,
    "Mapbox 2": mapbox2,
  };

  L.control.layers(baseLayers).addTo(map);
});

// <iframe width='100%' height='400px' src="https://api.mapbox.com/styles/v1/ttoews45/cleuc9bej000f01p5r173pdy8.html?title=false&access_token=pk.eyJ1IjoidHRvZXdzNDUiLCJhIjoiY2xldWJ5MjQwMDZkNzNxcnRuZHd5eXpqOSJ9.vxwK3vw-CjJH5GF9ihrpsg&zoomwheel=false#9.88/51.0167/-114.0239" title="Streets" style="border:none;"></iframe>
// https://api.mapbox.com/styles/v1/ttoews45/cleuc9bej000f01p5r173pdy8.html?title=view&access_token=pk.eyJ1IjoidHRvZXdzNDUiLCJhIjoiY2xldWJ5MjQwMDZkNzNxcnRuZHd5eXpqOSJ9.vxwK3vw-CjJH5GF9ihrpsg&zoomwheel=true&fresh=true#9.88/51.0167/-114.0239
