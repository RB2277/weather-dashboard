// Open Weather API:
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


searchBtn = $("#searchBtn")


searchBtn.on('click', function() {
    city = $("#cityName").val()
    const APIKey = "1d02bb78f2d95bd338c4738247d99a03"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
    .then(res => res.json())
    .then(data => {
        var lon = data.coord.lon
        var lat = data.coord.lat
    return (fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey))
    })
    .then(response => response.json())
    .then(forecast => console.log(forecast))
});

//user story
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly


//Acceptance Criteria
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city