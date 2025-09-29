
import { useContext } from 'react'
import { Store } from '../context'
import { formattedDate } from '../utils/formattedDate'
import WeatherImage from './WeatherImage'

const WeatherInfo = () => {
    const { weatherData } = useContext(Store)

    return (
        <div className="rounded-xl relative font-DM-Sans">
            <picture>
                <source media="(min-width:768px)" srcSet="/images/bg-today-large.svg" />
                <source media="(max-width:767px)" srcSet="/images/bg-today-small.svg" />
                <img loading="eager" src="/images/bg-today-large.svg" alt="Background Today" className='w-full h-full' />
            </picture>
            <div className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-between w-full p-8 max-md:flex-col max-md:gap-2">
                <div className='max-md:text-center'>
                    <h2 className="text-3xl font-bold mb-2">{weatherData.city}, {weatherData.country}</h2>
                    <span className="opacity-80 text-base">{formattedDate()}</span>
                </div>
                <div className="flex items-center gap-4">
                    <WeatherImage weatherCode={weatherData.current.weatherCode} />
                    <span className="text-8xl max-lg:text-6xl font-bold font-DM-Sans italic">{weatherData.current.temperature}</span>
                </div>
            </div>
        </div>
    )
}

export default WeatherInfo