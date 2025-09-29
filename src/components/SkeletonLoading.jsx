import { Skeleton } from "@/components/ui/skeleton"
import { Icon } from "@iconify/react"
import { weatherDetails } from "../constants"


const SkeletonLoading = () => {
    return (
        <div className="flex gap-8 max-xl:flex-col">
            <div className="w-3/4 flex flex-col gap-8 max-xl:w-full">
                <Skeleton className="h-[295px] w-full rounded-xl grid place-items-center" >
                    <div className="flex flex-col justify-center items-center">
                        <Icon icon={'svg-spinners:3-dots-bounce'} fontSize={52} />
                        <span className="text-xl font-bold">Loading...</span>
                    </div>
                </Skeleton>
                <div className="flex items-center gap-4 justify-between max-md:flex-wrap">
                    {
                        weatherDetails.map((el, index) => (
                            <Skeleton key={index} className="h-32 p-4 w-full rounded-xl flex flex-col justify-between gap-2 max-md:w-[calc((100%/2)-12px)]">
                                <span className="text-Neutral-200 font-medium text-base">{el}</span>
                                <span className="h-1 rounded-full bg-white w-6"></span>
                            </Skeleton>
                        ))
                    }
                </div>
                <div className="mt-8 max-xl:mt-0">
                    <span className="font-bold text-xl">Daily forecast</span>
                    <div className="flex mt-6 items-center gap-4 justify-between max-md:flex-wrap">
                        {
                            Array.from({ length: 7 }).map((el, index) => <Skeleton key={index} className="h-64 max-lg:h-32 w-full rounded-xl max-md:w-[calc((100%/3)-12px)]" />)
                        }
                    </div>
                </div>
            </div>
            <div className="w-1/3 flex flex-col gap-8 max-xl:w-full">
                <Skeleton className="h-full w-full rounded-3xl bg-Neutral-800 flex flex-col gap-1 relative overflow-hidden" >
                    <div className="flex items-center justify-between sticky bg-Neutral-800 p-4 w-full top-0">
                        <h3 className="font-semibold text-xl">Hourly forecast</h3>
                        <div className="flex p-1 px-4 rounded-md bg-Neutral-600 items-center gap-2">
                            <span className="text-xl">-</span>
                            <Icon icon='ci:chevron-down' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 flex-1 justify-between overflow-auto thin-scrollbar">
                        {
                            Array.from({length: 10}).map((el, index) => (
                                <Skeleton key={index} className="h-14 w-full rounded-xl" />
                            ))
                        }
                    </div>
                </Skeleton>
            </div>
        </div>
    )
}

export default SkeletonLoading