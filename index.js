function getWeather() {
    var city = document.getElementById("cityInput").value;
    var apiKey = 'db44823c5302ca7250154de6d6e2521a';
    var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        var temperature = data.main.temp;
        var description = data.weather[0].description;
        var currentWeather = `Clima atual: ${description}, Temperatura: ${temperature}°C`;
        document.getElementById("currentWeather").innerText = currentWeather;
    })
    .catch(error => {
        console.error('Erro ao obter previsão do tempo atual:', error);
        document.getElementById("currentWeather").innerText = 'Erro ao obter previsão do tempo atual. Por favor, tente novamente mais tarde.';
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        var forecastInfo = '';
        for (var i = 0; i < data.list.length; i++) {
            var date = new Date(data.list[i].dt * 1000);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var temperature = data.list[i].main.temp;
            var description = data.list[i].weather[0].description;
            forecastInfo += `${day}/${month}/${year}: Clima: ${description}, Temperatura: ${temperature}°C<br>`;
        }
        document.getElementById("forecast").innerHTML = forecastInfo;
    })
    .catch(error => {
        console.error('Erro ao obter previsão do tempo para os próximos dias:', error);
        document.getElementById("forecast").innerText = 'Erro ao obter previsão do tempo para os próximos dias. Por favor, tente novamente mais tarde.';
    });
}
