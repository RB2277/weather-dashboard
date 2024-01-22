// Open Weather API:
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
Today = dayjs().format("M/DD/YYYY");

searchBtn = $("#searchBtn");
pickedCity = $("#pickedCity");

function recentSearches() {
  for (let i = 1; i <= 5; i++) {
    let pastSearch = localStorage.getItem("Recent City " + i);
    if (pastSearch != null) {
      $("#recentSearches").append(
        `<button type="button" class ="cityButton btn btn-secondary btn-lg btn-block m-2">${pastSearch}</button>`
      );
    }
  }
}

function generateForecast(city) {
  city = $("#cityName").val();
  const APIKey = "1d02bb78f2d95bd338c4738247d99a03";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +  city + "&appid=" + APIKey;
  fetch(queryURL)
    .then((res) => res.json())
    .then((data) => {
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      let forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +  "&lon=" +  lon +  "&units=imperial" +  "&appid=" +  APIKey;
      return fetch(forecastAPI);
    })
    .then((response) => response.json())
    .then((forecast) => {
      console.log(forecast);
      $("#pickedCity").text(forecast.city.name + " " + Today);
      $("#todayTemp").text(forecast.list[0].main.temp + "°F");
      $("#todayWind").text(forecast.list[0].wind.speed + " " + "MPH");
      $("#todayHumidity").text(forecast.list[0].main.humidity + "" + "%");
      $("#todayDiv").removeClass("d-none");
      let iconCode = forecast.list[0].weather[0].icon;
      let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      $("#weatherIconToday").attr("src", iconUrl);

      for (let i = 1; i <= 5; i++) {
        $("#temp" + i).text(forecast.list[i * 7].main.temp + "°F");
        $("#wind" + i).text(forecast.list[i * 7].wind.speed + " " + "MPH");
        $("#humidity" + i).text(forecast.list[i * 7].main.humidity + "" + "%");
        $("#day" + i).text(dayjs().add(i, "day").format("M/DD/YYYY"));
        $("#day" + i + "Div").removeClass("d-none");
        let iconCode = forecast.list[i * 7].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $("#weatherIcon" + i).attr("src", iconUrl);
      }
      for (let i = 4; i >= 1; i--) {
        let recentCities = localStorage.getItem("Recent City " + i);
        if (recentCities != null) {
          localStorage.setItem("Recent City " + (i + 1), recentCities);
        }
      }
      let saveCity = forecast.city.name;
      localStorage.setItem("Recent City 1", saveCity);
      $("#recentSearches").append(`<button type="button" class ="cityButton btn btn-secondary btn-lg btn-block m-2">${saveCity}</button>`);
    });
}

searchBtn.on("click", generateForecast);

recentSearches();
//Credit to samu101108 on https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon for the Icon code
