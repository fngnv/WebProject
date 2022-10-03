const showButton = document.getElementById('showWeather');
const cityNameInput = document.getElementById('cityInput');
const cityNameOutput = document.getElementById('cityName');
const outputDiv = document.getElementById('weatherOutput');
const descOutput = document.getElementById('desc');
const tempOutput = document.getElementById('temp');

showButton.addEventListener('click', function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=cdda7f75f58e839c72c72d4cb3709bef&units=metric`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            let name = data['name'];
            let temperature = data['main']['temp'];
            let description = data['weather'][0]['description'];

            cityNameOutput.innerHTML = name;
            tempOutput.innerHTML = temperature;
            descOutput.innerHTML = description;
        })

        .catch(error => console.log(error));
})