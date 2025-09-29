import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react";
import { Store } from "../context";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";


const SearchBox = () => {
    const { searchWithLocation, getWeather, setGeoLocationData} = useContext(Store)
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const debounceSearchValue = useDebounce(searchValue, 800)
    
    const handleSearch = async () => {
        setSearchResults(null)
        const response = await searchWithLocation(debounceSearchValue)
        setSearchResults(response.results)
    }

    const handleSelectSearchResult = async (selectedValue) => {
        setSearchValue('')
        const geolocationData = {
            latitude: selectedValue.latitude,
            longitude: selectedValue.longitude,
            city: selectedValue.name,
            country: selectedValue.country,
        }
        setGeoLocationData(geolocationData)
        await getWeather(geolocationData)
    }

    useEffect(() => {
        debounceSearchValue.trim() !== '' ? handleSearch() : setSearchResults(null)
    }, [debounceSearchValue])


    return (
        <div className="search flex gap-3 mt-18 max-xl:mb-8 mb-12 w-[40%] max-xl:w-full mx-auto max-md:flex-col">
            <div className="relative w-full">
                <Icon icon='material-symbols:search-rounded' className="absolute top-1/2 -translate-y-1/2 left-5 text-Neutral-200" fontSize={24} />
                <Input onChange={e => setSearchValue(e.target.value)} value={searchValue} type="text" className="bg-Neutral-800 border-none hover:bg-Neutral-700 !p-3.5 !px-14 h-auto placeholder:text-Neutral-200" placeholder="Search for a place..." />
                {
                    searchValue !== '' &&
                    <div className="results absolute z-50 w-full rounded-lg bg-Neutral-800 p-1 mt-2 max-h-[225px] overflow-auto thin-scrollbar flex flex-col">
                        {
                            searchResults
                                ?
                                searchResults.map((result, index) => (
                                    <div key={index} className="flex items-center gap-4 p-2.5 rounded-md cursor-pointer hover:bg-Neutral-700" onClick={() => handleSelectSearchResult(result)}>
                                        {result.name}, {result.country}
                                    </div>
                                ))
                                :
                                <div className="loading flex items-center gap-2 flex-1 p-4">
                                    {
                                            searchResults === null
                                                ?
                                                <>
                                                    <Icon icon={'icon-park-outline:loading-one'} className="animate-spin" fontSize={24} />
                                                    <span>Search in progress</span>
                                                </>
                                                :
                                                <>
                                                    <span>No search result found!</span>
                                                </>
                                    }
                                </div>
                        }
                    </div>
                }
            </div>
            <Button className="h-auto px-6 max-md:p-3 text-base">Search</Button>
        </div>
    )
}

export default SearchBox