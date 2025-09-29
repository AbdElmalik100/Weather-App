import { useContext, useEffect, useState } from 'react'
import { Store } from '../context'

const WeatherDetails = () => {
    const { weatherData } = useContext(Store)
    const [weatherDetails, setWeatherDetails] = useState([])
    useEffect(() => {
        setWeatherDetails([
            {
                name: "Feels Like",
                value: weatherData.current.feelsLike,
            },
            {
                name: "Humidity",
                value: weatherData.current.humidity,
            },
            {
                name: "Wind",
                value: weatherData.current.windSpeed,
            },
            {
                name: "Precipitation",
                value: weatherData.current.precipitation,
            },
        ])
    }, [weatherData])
    return (
        <div className="flex items-center gap-6 justify-between font-DM-Sans max-md:flex-wrap">
            {
                weatherDetails.map((details, index) => (
                    <div key={index} className="rounded-xl bg-Neutral-800 border border-Neutral-600 p-4 flex flex-col gap-6 w-full max-md:w-[calc((100%/2)-12px)]">
                        <span className="text-Neutral-200 font-medium text-base">{details.name}</span>
                        <h3 className="text-4xl max-lg:text-2xl">{details.value}</h3>
                    </div>
                ))
            }
        </div>
    )
}

export default WeatherDetails