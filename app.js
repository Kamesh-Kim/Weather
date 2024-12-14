let apiKey = 'e4e507cdf3ddf9e6ef37c1eb679b5e05'

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='



let temp = document.querySelector('#temp')
let name = document.querySelector('#name')
let humidity = document.querySelector('#humidity')
let wind = document.querySelector('#wind')
let searchBox = document.querySelector('#searchBox')
let searchBtn = document.querySelector('#searchBtn')
let weatherIcon = document.querySelector('#weatherIcon')
let backImage = document.querySelector('#backImage')
let container = document.querySelector('#container')


let weatherPriority = {
    Rain: 1,
    Drizzle: 2,
    Snow: 3,
    Clouds: 4,
    Clear: 5,
    Mist: 6,
};

let error = document.querySelector('#error')




async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}` )
    let data =await response.json()

    if (data.cod === "404") {
        error.innerText = 'City not found';
        container.classList.add('hidden');
        return;
    }

        error.innerText = ''
        container.classList.remove('hidden')



        temp.innerText = `${(Math.round(data.main.temp))}°C`
        name.innerText = data.name;
        humidity.innerText = data.main.humidity + `%`
        wind.innerText = `${(Math.round(data.wind.speed))}km/h`
    
    
        
    
        let weatherConditions = data.weather.map(condition => condition.main);
        weatherConditions.sort((a, b) => weatherPriority[a] - weatherPriority[b]);
        let mainWeather = weatherConditions[0];
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src =  "clouds.png"
            backImage.src = "Clouds.jpg"
    
        }
    
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png"
            backImage.src = "Clear.webp"
    
        }
    
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png"
            backImage.src = "Drizzle.jpg"
    
        }
    
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png"
            backImage.src = "Mist.jpeg"
    
        }
    
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png"
            backImage.src = "Rain.jpg"
    
            
        }
    
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png"
            backImage.src = "Snow.jpg"
    
        }
        

    

}



searchBtn.addEventListener('click', ()=>{

    checkWeather(searchBox.value)
})


searchBox.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter')
        checkWeather(searchBox.value)
})

checkWeather('Chennai')