import { Icon } from "@iconify/react"
import { Button } from '@/components/ui/button'

const Error = () => {
    return (
        <div className="flex items-center justify-center gap-6 flex-col text-center py-18">
            <Icon icon={'jam:stop-sign'} className="text-Neutral-300" fontSize={64} />
            <h1 className="font-bold text-5xl max-md:text-3xl">Something went wrong</h1>
            <p className="text-Neutral-200 font-medium xl:w-1/3 lg:w-1/2 md:w-3/4 w-full text-lg max-md:text-sm">
                We couldn't connect to the server (API error). Please try again in few moments.
            </p>
            <Button variant='secondary' size="lg" className="text-base" onClick={() => window.location.reload()}>
                    <Icon icon={'jam:refresh'} className="text-xl" />
                    Retry
            </Button>
        </div>
    )
}

export default Error