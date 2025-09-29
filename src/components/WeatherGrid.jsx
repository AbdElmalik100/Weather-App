
import { useContext } from "react"
import { Store } from "../context"
import DailyForecast from "./DailyForecast"
import HourlyForecast from "./HourlyForecast"
import WeatherDetails from "./WeatherDetails"
import WeatherInfo from "./WeatherInfo"
import SkeletonLoading from "./SkeletonLoading"


const WeatherGrid = () => {
    const { loading } = useContext(Store)
    return (
        !loading
            ?
            <div className="weather-grid flex gap-8 max-xl:flex-col">
                <div className="left-side w-3/4 max-xl:w-full flex flex-col gap-8">
                    <WeatherInfo />
                    <WeatherDetails />
                    <DailyForecast />
                </div>
                <HourlyForecast />
            </div>
            :
            <SkeletonLoading />
    )
}

export default WeatherGrid