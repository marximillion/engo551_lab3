console.log("Success loading .js script");
$(document).ready(function () {
  var map = L.map("map").setView([51.0447, -114.0719], 10);

  fetch("https://data.calgary.ca/resource/c2es-76ed.geojson")
    .then((response) => response.json())
    .then((data) => {
      const permitClassGroups = new Set();
      data.features.forEach((feature) => {
        permitClassGroups.add(feature.properties.permitclassgroup);
      });
      const uniquePermitClassGroups = Array.from(permitClassGroups);
      console.log(uniquePermitClassGroups);
      console.log(uniquePermitClassGroups[1]);
      const dates = data.features.map(
        (feature) => new Date(feature.properties.issueddate)
      );
      const oldest = dates.reduce((a, b) => (a < b ? a : b));
      const latest = dates.reduce((a, b) => (a > b ? a : b));
      console.log("Oldest issued date:", oldest);
      console.log("Latest issued date:", latest);
    });

  const defaultIcon = L.icon({
    iconUrl: "static/default-icon.png",
    iconSize: [50, 50],
  });

  const iconMapping = {
    "Single Family": L.icon({
      iconUrl: "static/family-icon.png",
      iconSize: [50, 50],
    }),
    "Two Family": L.icon({
      iconUrl: "static/family-icon.png",
      iconSize: [50, 50],
    }),
    Garage: L.icon({
      iconUrl: "static/garage-icon.png",
      iconSize: [50, 50],
    }),
    Commercial: L.icon({
      iconUrl: "static/commercial-icon.png",
      iconSize: [50, 50],
    }),
    Apartment: L.icon({
      iconUrl: "static/apartment-icon.png",
      iconSize: [50, 50],
    }),
    Townhouse: L.icon({
      iconUrl: "static/townhouse-icon.png",
      iconSize: [50, 50],
    }),
    Institutional: L.icon({
      iconUrl: "static/institution-icon.png",
      iconSize: [50, 50],
    }),
    Industrial: L.icon({
      iconUrl: "static/industrial-icon.png",
      iconSize: [50, 50],
    }),
    Government: L.icon({
      iconUrl: "static/government-icon.png",
      iconSize: [50, 50],
    }),
    "Swimming Pool": L.icon({
      iconUrl: "swimming-pool-icon.png",
      iconSize: [50, 50],
    }),
  };

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?

    const permitClassGroup = feature.properties.permitclassgroup;

    var popupContent =
      "<p><b>Isued Date [UTC]:</b> " +
      feature.properties.issueddate +
      "</p>" +
      "<p><b>Work Class Group:</b> " +
      feature.properties.workclassgroup +
      "</p>" +
      "</p>" +
      "<p><b>Contractor Name:</b> " +
      feature.properties.contractorname +
      "<p><b>Community Name:</b> " +
      feature.properties.communityname +
      "</p>" +
      "<p><b>Original Address:</b> " +
      feature.properties.originaladdress;

    if (permitClassGroup in iconMapping) {
      layer.setIcon(iconMapping[permitClassGroup]);
    } else {
      layer.setIcon(defaultIcon);
    }

    layer.bindPopup(popupContent);
  }

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

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  L.marker([51.0447, -114.0719], { icon: cityHall })
    .addTo(map)
    .bindPopup(
      "This marker indicates Calgary's City Hall, located at: 800 Macleod Trail SE, Calgary, AB T2G 5E6"
    )
    .openPopup();
  //.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

  const form = document.getElementById("dates");

  form.addEventListener("submit", (event) => {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const startdate = window.S_Date.slice(0, -1);
    const enddate = window.E_Date.slice(0, -1);

    var markers = L.markerClusterGroup();
    console.log(`https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate > \'${startdate}\' and issueddate< \'${enddate}\'`);
    fetch(
      `https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate > \'${startdate}\' and issueddate< \'${enddate}\'`
    )
      .then((response) => response.json())
      .then((data) => {
        // Use the GeoJSON data here
        var temp = L.geoJSON(data, {
          style: myStyle,
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon:
                iconMapping[feature.properties.permitclassgroup] || defaultIcon,
            });
          },
        });

        markers.addLayer(temp);
        map.addLayer(markers);
      });

    console.log("I get it: " + startdate);
    console.log("I get:", enddate);
  });
});
