const apiKey = "API_KEY";
const apiUrl = "API_URL";

document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search_field input");
    const searchButton = document.querySelector(".search_field .button");
    const searchButtonClear = document.querySelector(".search_field .button_clear");
    const weatherIcon = document.querySelector(".weather_image");
    const inputCheck = document.querySelector(".input_check_message");
    const inputCheckLn = document.querySelector(".input_check_length");
    const weatherContainer = document.querySelector(".weather_container");
    const details = document.querySelector('.details');
    const mainDetails = document.querySelector('.main_details');

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status == 404){
            inputCheck.style.display = "block";
            inputCheckLn.style.display = "none";
            mainDetails.style.opacity = "0";
            mainDetails.style.transition = "opacity 0.5s";
            details.style.opacity = "0";
            details.style.transition = "opacity 0.5s";
            setTimeout(() => {
                weatherContainer.classList.remove('active');
            }, 1000);
        }else if(city.trim() === ""){
            inputCheckLn.style.display = "block";
            inputCheck.style.display = "none";
            mainDetails.style.opacity = "0";
            mainDetails.style.transition = "opacity 0.5s";
            details.style.opacity = "0";
            details.style.transition = "opacity 0.5s";
            setTimeout(() => {
                weatherContainer.classList.remove('active');
            }, 1000);
        } else{
            weatherContainer.classList.add('active');
            inputCheck.style.display = "none";
            inputCheckLn.style.display = "none";
            setTimeout(() => {
                mainDetails.style.opacity = "1";
                mainDetails.style.transition = "opacity 0.5s";
                details.style.opacity = "1";
                details.style.transition = "opacity 0.5s";
            }, 1000);

            var data = await response.json();
            console.log(data);
            
            const dataWeather = data.weather[0].main.toLowerCase();
            const sunriseTimestamp = data.sys.sunrise;
            const sunsetTimestamp = data.sys.sunset;
            
            const convertTimestampToTime = (timestamp) => {
              const date = new Date(timestamp * 1000);
            
              const timeOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              };
            
              return new Intl.DateTimeFormat('en-US', timeOptions).format(date);
            };

            const readableSunriseTime = convertTimestampToTime(sunriseTimestamp);
            const readableSunsetTime = convertTimestampToTime(sunsetTimestamp);
            
            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
            document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
            document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
            document.querySelector('.sunrise').innerHTML = readableSunriseTime;
            document.querySelector('.sunset').innerHTML = readableSunsetTime;
    
            switch(dataWeather){
                case "clear":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
                case "clouds":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
                case "rain":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
                case "drizzle":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
                case "thunderstorm":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
                case "snow":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
                case "mist":
                    return weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
                default:
                    return weatherIcon.src = "media/icons8-404-64.png"
            };
        };
        }

    searchButton.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
    
    searchBox.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            checkWeather(searchBox.value);
        }
    });

    searchButtonClear.addEventListener("click", () => {
        searchBox.value = '';
        mainDetails.style.opacity = "0";
        mainDetails.style.transition = "opacity 0.5s";
        details.style.opacity = "0";
        details.style.transition = "opacity 0.5s";
        setTimeout(() => {
            weatherContainer.classList.remove('active');
        }, 1000);
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.keyCode === 27) {
            searchBox.value = '';
            mainDetails.style.opacity = "0";
            mainDetails.style.transition = "opacity 0.5s";
            details.style.opacity = "0";
            details.style.transition = "opacity 0.5s";
            setTimeout(() => {
                weatherContainer.classList.remove('active');
            }, 1000);
        }
    });

});
