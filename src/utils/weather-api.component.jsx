
import {apiUrl} from './constants.jsx'


export const getWeatherForecast = () =>{

    const WeatherApi = fetch(apiUrl).then((res)=>{
        if(res.ok){
            return res.json()
        } else{
            return Promise.reject(`Error: ${res.status}`)
        }
    })
return WeatherApi
    
}

export const parseWeatherData = (data) =>{

    const main =data.main
    const temperature = main && main.temp
    return Math.ceil(temperature)
}

export default getWeatherForecast