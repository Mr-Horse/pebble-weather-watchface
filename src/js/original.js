function getCurrentWeather (lon, lat) {
  var req = new XMLHttpRequest();
    req.open('GET',"https://api.forecast.io/forecast/" + forecastIOKey + "/" + 50.087015 + "," + 14.502838, true);
    req.onload = function(e) {
      if (req.readyState == 4 && req.status == 200) {
        if(req.status == 200) {
          var response = JSON.parse(req.responseText);

          var send = { };
          if (response.currently) {
            var icon = icons.indexOf(response.currently.icon);

            // if the icon isn't found, default to error
            if (icon === -1) {
              icon = 10;
            }

            send.icon = icon;
            send.temperature_f = Number(response.currently.temperature).toFixed(0);
            send.temperature_c = Number(FtoC(response.currently.temperature)).toFixed(0);
          }

          Pebble.sendAppMessage(send);
        } else {
          console.log("Error");
        }
      }
    };

    req.send(null);
}

function FtoC (f) {
  return (f - 32) * 5 / 9;
}

Pebble.addEventListener("ready",
  function(e) {
    setTimeout(getAndShowWeather, 2000);
  }
);
