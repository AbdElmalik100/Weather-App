import { useContext, useState } from 'react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react'
import { units } from '../constants'
import { Store } from '../context'

const Units = () => {
    const { selectedValue, setSelectedValue, mode, setMode } = useContext(Store)

    const toggleMode = () => {
        if (mode === 'Switch to Metric') {
            setMode('Switch to Imperial')
            setSelectedValue({
                "temperature": 'Celsius (°C)',
                "wind speed": 'km/h',
                "precipitation": 'Millimeters (mm)'
            })
        } else {
            setMode('Switch to Metric')
            setSelectedValue({
                "temperature": 'Fahrenheit (°F)',
                "wind speed": 'mph',
                "precipitation": 'Inches (in)'
            })
        }
    }
    const handleSelectChange = (groupLabel, value) => setSelectedValue(prev => ({ ...prev, [groupLabel]: value }))

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="border border-input">
                    <Icon icon='material-symbols:settings-outline' />
                    <span>Units</span>
                    <Icon icon='ci:chevron-down' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[200px] p-0">
                <span
                    className="p-1.5 px-2 rounded-md hover:bg-Neutral-700 m-1 cursor-default flex items-center justify-between"
                    onClick={toggleMode}
                >
                    {mode}
                </span>
                {
                    units.map((unit, index) => (
                        <div key={index}>
                            <ul>
                                {unit.label && <Label className="text-Neutral-300 text-xs p-0 px-2.5 py-0.5 capitalize">{unit.label}</Label>}
                                {
                                    unit.values.map((val, indx) => (
                                        <li
                                            key={indx}
                                            className={`p-1.5 px-2 rounded-md hover:bg-Neutral-700 m-1 cursor-default flex items-center justify-between ${selectedValue[unit.label] === val && 'bg-Neutral-700'}`}
                                            onClick={() => handleSelectChange(unit.label, val)}
                                        >
                                            {val}
                                            {selectedValue[unit.label] === val && <Icon icon='material-symbols:check-rounded' fontSize={18} />}
                                        </li>
                                    ))
                                }
                            </ul>
                            {(index !== units.length - 1 && index !== 0) && <hr className='py-1' />}
                        </div>
                    ))
                }
            </PopoverContent>
        </Popover>
    )
}

export default Units