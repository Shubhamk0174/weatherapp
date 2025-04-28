//WEATHER APP
const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "6950f925bc43238cb8a38fa4efcbda41";

weatherform.addEventListener("submit", async event=>{

    event.preventDefault();

    const city = cityinput.value;
    console.log(city);
    if(city){
        try{
            const weatherdata= await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){{
            console.error(error);
            displayerror(error)
        }}
    }
    else{
        displayerror("Please Enter a Valid City")
    }

});


async function getweatherdata(city) {

    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response= await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json()
}

function displayweatherinfo(data){
    console.log(data);
    const {name: city, 
           main:{temp, humidity}, 
           weather: [{description, id}],
           wind:{speed}} = data;

    card.textContent="";
    card.style.display="flex";
    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");
    const windspeed= document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity: ${humidity}%`;
    windspeed.textContent= `Wind Speed: ${(speed*3.6).toFixed(2)} Km/hr`;
    descdisplay.textContent= description;
    weatheremoji.textContent= getweatheremoji(id);

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    windspeed.classList.add("windspeed");
    descdisplay.classList.add("descdisplay");
    weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(windspeed)
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);

}

function getweatheremoji(weatherid){
    
    switch(true){
        case (weatherid >=200 && weatherid<300):
            return "🌩️";
            break;
        case (weatherid >=300 && weatherid<400):
            return "☔";
            break;
        case (weatherid >=500 && weatherid<600):
            return "🌧️";
            break;
        case (weatherid >=600 && weatherid<700):
            return "❄️";
            break;
        case (weatherid >=700 && weatherid<800):
            return "🌫️";
            break;
        case (weatherid === 800):
            return "🌞";
            break;
        case (weatherid>800):
            return "⛅";
            break;
        default:
            return "❓";
    }
}


function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent= message;
    errordisplay.classList.add("errordisplay");

    card.textContent ="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}