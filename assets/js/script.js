Today = dayjs().format("M/DD/YYYY");
searchBtn = $("#searchBtn");
recentSearch = $("#recentSearches");
pickedCity = $("#pickedCity");

//Function that loads local storage upon page load
function recentSearches() {
  for (let i = 1; i <= 5; i++) {
    let pastSearch = localStorage.getItem("Recent City " + i);
    if (pastSearch != null) {
      $("#recentSearches").append(`<button type="button" id ="recentSearch" class ="cityButton btn btn-secondary btn-lg btn-block m-2">${pastSearch}</button>`
      );
    }
  }
}
//Function that generates the 5 day forecast
function generateForecast(city) {
  const APIKey = "1d02bb78f2d95bd338c4738247d99a03";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
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
  //Loop that grabs the temp, wind, and humidity for all five of the days and applies that to the HTML
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
  //Loop that shifts down all of the currently saved storage by 1
      for (let i = 4; i >= 1; i--) {
        let recentCities = localStorage.getItem("Recent City " + i);
        if (recentCities != null) {
          localStorage.setItem("Recent City " + (i + 1), recentCities);
        }
  //Limits the maximum amount of search history in storage to 5
      }
      if($("#recentSearches button").length >=5) {
        $("#recentSearches button:last-child").remove()
      }
  //Sets the searched city into local storage
     let saveCity = forecast.city.name;
      localStorage.setItem("Recent City 1", saveCity);
      $("#recentSearches").prepend(`<button type="button" id ="recentSearch" class ="cityButton btn btn-secondary btn-lg btn-block m-2">${saveCity}</button>`);
    })
    .catch(error => {
      alert("Error retrieving the forecast. Please try again")
      console.log(error)
    })
}
  //Event listener on the search button
searchBtn.on("click", function() {
    generateForecast($("#cityName").val())
});
  //Event listener on the local storage items
recentSearch.on('click', "#recentSearch", function() {
    generateForecast($(this).text())
} )
  //Calls the recentSearches function at the top of the page
recentSearches();


//Credit to samu101108 on https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon for the Icon code
