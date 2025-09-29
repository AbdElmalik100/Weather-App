import { fetchWeatherApi } from 'openmeteo';
import { createContext, useEffect, useState } from 'react';
import { unitMap } from '../constants';

export const Store = createContext('store')


export function WeatherProvider({ children }) {
    const [weatherData, setWeatherData] = useState(null);
    const [geoLocationData, setGeoLocationData] = useState(null)
    const [selectedValue, setSelectedValue] = useState({
        "temperature": 'Celsius (°C)',
        "wind speed": 'km/h',
        "precipitation": 'Millimeters (mm)'
    })
    const [mode, setMode] = useState('Switch to Imperial')
    const [error, setError] = useState(false)

    // --- Helpers ---
    const convertWindSpeed = (value) => {
        if (!value) return "0";
        return selectedValue["wind speed"] === "mph"
            ? `${Math.round(value * 2.23694)} mph`
            : `${Math.round(value * 3.6)} km/h`;
    };

    const convertPrecipitation = (value) => {
        if (value === '') return "0";
        return selectedValue.precipitation === "Inches (in)"
            ? `${Math.round(value / 25.4)} in`
            : `${Math.round(value)} mm`;
    };

    const searchWithLocation = async (location) => {
        try {
            setError(false)
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    const getGeolocation = async (latitude, longitude) => {
        try {
            setError(false)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            return data.address;
        } catch (error) {
            console.log(error);
            setError(true)
        }
    };

    const getWeather = async ({ latitude, longitude, country, city }) => {
        setWeatherData(null)
        setError(false)
        const params = {
            latitude,
            longitude,
            timezone: "auto",
            daily: 'temperature_2m_min,temperature_2m_max,weather_code',
            hourly: "temperature_2m,weather_code,precipitation",
            current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code",
            temperature_unit: unitMap[selectedValue.temperature],
            wind_speed_unit: unitMap[selectedValue['wind speed']],
            precipitation_unit: unitMap[selectedValue.precipitation]
        };

        try {
            const responses = await fetchWeatherApi(
                "https://api.open-meteo.com/v1/forecast",
                params
            );

            const response = responses[0];

            const utcOffsetSeconds = response.utcOffsetSeconds();
            const daily = response?.daily()
            const hourly = response?.hourly();
            const current = response?.current();

            const weather = {
                country: country || "Egypt",
                city: city || "Zagazig",
                latitude: response.latitude(),
                longitude: response.longitude(),
                elevation: response.elevation(),
                utc_offset_seconds: utcOffsetSeconds,
                timezone: response.timezone(),
                timezone_abbreviation: response.timezoneAbbreviation(),
                daily: {
                    time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                        (_, i) =>
                            new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    minTemperature: daily.variables(0)?.valuesArray(),
                    maxTemperature: daily.variables(1)?.valuesArray(),
                    weatherCode: daily.variables(2)?.valuesArray(),
                },
                hourly: {
                    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                        (_, i) =>
                            new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature: hourly.variables(0)?.valuesArray(),
                    weatherCode: hourly.variables(1)?.valuesArray(),
                    precipitation: hourly.variables(2)?.valuesArray(),
                },
                current: {
                    temperature: `${Math.round(current.variables(0)?.value())}°`,
                    feelsLike: `${Math.round(current.variables(1)?.value())}°`,
                    humidity: `${current.variables(2)?.value()}%`,
                    windSpeed: convertWindSpeed(current.variables(3)?.value()),
                    precipitation: convertPrecipitation(current.variables(4)?.value()),
                    weatherCode: current.variables(5)?.value(),
                },
            };

            setWeatherData(weather);
        } catch (err) {
            console.error("Weather fetch error:", err);
            setError(true)
        }
    };


    // auto fetch on mount
    useEffect(() => {
        if (geoLocationData) {
            getWeather(geoLocationData);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const geoLocationData = await getGeolocation(latitude, longitude);
                    getWeather({ longitude, latitude, ...geoLocationData });
                },
                () => getWeather({ longitude: 52.52, latitude: 13.41 }), // fallback Berlin
                { enableHighAccuracy: true }
            );
        } else {
            getWeather({ longitude: 52.52, latitude: 13.41 })
        }
    }, [mode, selectedValue]);

    return (
        <Store.Provider value={{
            weatherData,
            selectedValue,
            mode,
            geoLocationData,
            error,
            getWeather,
            setGeoLocationData,
            searchWithLocation,
            getGeolocation,
            setSelectedValue,
            setMode
        }}>
            {children}
        </Store.Provider>
    );
}

export default WeatherProvider