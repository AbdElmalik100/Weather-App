import { useContext, useEffect, useMemo } from 'react'
import { Store } from '../context'
import WeatherImage from './WeatherImage'

const DailyForecast = () => {
    const { weatherData } = useContext(Store)

    const dailyForecast = useMemo(() => (
        weatherData.daily.time.map((date, index) => ({
            day: new Date(date).toLocaleDateString("en-US", { weekday: 'short' }),
            min: `${Math.round(weatherData.daily.minTemperature[index])}°`,
            max: `${Math.round(weatherData.daily.maxTemperature[index])}°`,
            weatherCode: weatherData.daily.weatherCode[index]
        }))
    ), [weatherData])
    
    return (
        <div className="daily-forecast mt-8 max-xl:mt-0 font-DM-Sans">
            <span className="font-bold text-xl">Daily forecast</span>
            <div className="mt-4 flex items-center justify-between gap-4 max-md:flex-wrap">
                {
                    dailyForecast.map((el, index) => (
                        <div key={index} className="rounded-xl bg-Neutral-800 border border-Neutral-600 p-4 flex flex-col gap-4 items-center w-full max-lg:w-[calc((100%/3)-12px)]">
                            <span className="font-medium text-lg">{el.day}</span>
                            <WeatherImage weatherCode={el.weatherCode} />
                            <div className="flex items-center justify-between gap-4 font-medium text-base max-lg:text-xs w-full">
                                <span>{el.min}</span>
                                <span>{el.max}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DailyForecast