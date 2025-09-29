import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { days } from "../constants"
import { Store } from "../context"
import { useContext, useMemo, useState } from "react"
import WeatherImage from "./WeatherImage"


const HourlyForecast = () => {
    const { weatherData } = useContext(Store)
    const [selectedDay, setSelectedDay] = useState("saturday")

    const hourlyForecast = useMemo(() => (
        weatherData.hourly.time.map((date, index) => ({
                day: new Date(date).toLocaleDateString('en-US', {weekday: "long"}).toLowerCase(),
                time: new Date(date).toLocaleTimeString("en-US", { hour: "numeric" }),
                temperature: `${Math.round(weatherData.hourly.temperature[index])}°`,
                weatherCode: weatherData.hourly.weatherCode[index],
                precipitation: weatherData.hourly.precipitation[index],
        }))
    ), [weatherData])

    const filterByWeekday = useMemo(() => {
        if (!selectedDay) return hourlyForecast
        return hourlyForecast.filter(el => el.day === selectedDay)
    }, [hourlyForecast, selectedDay])


    return (
        <div className="right-side w-1/3 max-xl:w-full rounded-3xl bg-Neutral-800 flex flex-col gap-1 2xl:h-[835.88px] h-[742.42px] relative overflow-hidden">
            <div className="flex items-center justify-between sticky bg-Neutral-800 p-4 w-full top-0">
                <h3 className="font-semibold text-xl max-md:text-base">Hourly forecast</h3>
                <Select onValueChange={setSelectedDay} defaultValue={selectedDay}>
                    <SelectTrigger className="w-auto bg-Neutral-600 capitalize">
                        <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                        {days.map((day, index) => <SelectItem key={index} value={day} className="capitalize">{day}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-4 p-4 flex-1 justify-between overflow-auto thin-scrollbar">
                {
                    filterByWeekday.map((el, index) => (
                        <div key={index} className="flex items-center bg-Neutral-700 border border-Neutral-600 rounded-xl justify-between px-4">
                            <div className="flex items-center gap-2">
                                <WeatherImage weatherCode={el.weatherCode} className={'!w-16'} />
                                <span className="text-xl">{el.time}</span>
                            </div>
                            <span className="font-medium text-base">{el.temperature}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HourlyForecast