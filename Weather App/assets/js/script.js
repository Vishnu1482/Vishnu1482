let getWeather = async (city) => {
    let weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f793d137dbf2c313125f3254e59f88a1&units=metric';
    let weatherObj = await fetch(weatherAPI);
    let response = weatherObj.json();
    return response;
}

const cityInput = document.getElementById("city");

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCity();
    }
});

function searchCity() {
    const city = document.getElementById("city").value;
    getWeather(city)
        .then((response) => {
            showWeatherData(response);
            // console.log(response);
            changeBackgroundVideo(response);
        }).catch((err) => {
            console.log(err);
        })
}

showWeatherData = (weatherDisplay) => {
    let cityName = document.getElementById("city-name");
    let countryName = document.getElementById("country-name");
    let weatherType = document.getElementById("weather-type");
    let normalTemp = document.getElementById("temp");
    let minTemp = document.getElementById("min-temp");
    let maxTemp = document.getElementById("max-temp");

    cityName.innerText = weatherDisplay.name;
    countryName.innerText = weatherDisplay.sys.country;
    weatherType.innerText = weatherDisplay.weather[0].main;
    normalTemp.innerText = weatherDisplay.main.temp;
    minTemp.innerText = weatherDisplay.main.temp_min;
    maxTemp.innerText = weatherDisplay.main.temp_max;
}

function changeBackgroundVideo(weatherDisplay) {
    const backgroundVideo = document.getElementById("background-video");
    switch (weatherDisplay.weather[0].main.toLowerCase()) {
        case "clear":
            backgroundVideo.src = "assets/Video/Deep Blue Sky - Clouds Timelapse - Free Footage - Full HD 1080p.mp4";
            break;
        case "clouds":
            backgroundVideo.src = "assets/Video/footage-stormy-sky-moving-clouds 4k.mp4";
            break;
        case "rain":
            backgroundVideo.src = "assets/Video/Rain Background.mp4";
            break;
        case "snow":
            backgroundVideo.src = "assets/Video/Snow Falling Animated video Background Loop.mp4";
            break;
        case "mist":
            backgroundVideo.src = "assets/Video/1 Fog Atmosphere Side.mp4";
            break;
        default:
            backgroundVideo.src = "assets/Video/Galaxy Motion Background Video [HD] ~ FREE.mp4";
            break;
    }
}