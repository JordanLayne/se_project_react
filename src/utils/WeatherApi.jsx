
import { apiUrl } from "./Constants"


export const getWeatherForecast = () =>{

    const weatherApi = fetch(apiUrl).then((res)=>{
        if(res.ok){
            return res.json()
        } else{
            return Promise.reject(`Error: ${res.status}`)
        }
    })
return weatherApi
    
}

export const parseWeatherData = (data) =>{

    const main =data.main
    const temperature = main && main.temp
    return Math.ceil(temperature)
}

export default getWeatherForecast