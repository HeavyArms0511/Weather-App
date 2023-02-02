let appId ='154154ed98611f45758f74c35d9b0788';
let units ='imperial';
let searchMethod;

const getSearchMethod = (searchTerm) => {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        return searchMethod = 'zip'
    }
    else { 
        return searchMethod = 'q'
    }
}

const searchWeather = (searchTerm) =>{
    getSearchMethod(searchTerm)
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`).then(result => {
        return result.json()
    }).then(result => {
        init(result)
    })
}

const init = (resultFromServer) => {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
    
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
    let temperatureElement = document.getElementById('temperature')
    let humidityElement = document.getElementById('humidity')
    let windSpeedElement = document.getElementById('windSpeed')
    let cityHeader = document.getElementById('cityHeader')
    let weatherIcon = document.getElementById('documentIconImage')

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png'

    let resultDescription = resultFromServer.weather[0].description
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)

    temperatureElement.innerHTML = Math.ceil(resultFromServer.main.temp) + '&#176'

    windSpeedElement.innerHTML = 'Winds at ' + Math.ceil(resultFromServer.wind.speed) + 'mph'

    cityHeader.innerHTML = resultFromServer.backgroundImage
    humidityElement.innerHTML = 'Humidity ' + resultFromServer.main.humidity + '%'

    cityHeader.innerHTML = resultFromServer.name

    weatherInfo()
}

const weatherInfo = () => {
    let weatherContainer = document.getElementById('weatherContainer')
    let weatherContainerHeight = weatherContainer.clientHeight
    let weatherContainerWidth = weatherContainer.clientWidth

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`
    weatherContainer.style.visibility = 'visible'
}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value
    if(searchTerm){
    return searchWeather(searchTerm)
    }
})