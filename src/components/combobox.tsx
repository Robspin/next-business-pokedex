"use client"
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/utils/shadcn"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { X } from 'lucide-react'

type Dropdown = {
    name: string
    id: string
}

type Props = {
    dropdownData: Dropdown[]
    className?: string
    onSelectChange: (dropdownItem: Dropdown) => void
    name?: string
    defaultValue?: string
}

export default function Combobox({ dropdownData, className, onSelectChange, name, defaultValue }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(dropdownData.find(v => v.id === defaultValue)?.name ?? '')

    return (
        <div className="flex gap-1 justify-center items-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild disabled={dropdownData.length < 1}>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`w-full ${className} justify-between`}
                    >
                        {value
                            ? dropdownData.find((d) => value.includes(d.name))?.name
                            : `Select ${name ?? 'item'}`}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command filter={(value, search) => value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0}>
                        <CommandInput placeholder={`Search ${name ?? 'item'}...`} className="h-9"/>
                        <CommandEmpty>{name} not found.</CommandEmpty>
                        <CommandGroup className="max-h-80 overflow-scroll">
                            {dropdownData.map((d) => (
                                    <CommandItem
                                        key={d.name}
                                        value={d.name}
                                        onSelect={(currentValue) => {
                                            setValue(d.name)
                                            setOpen(false)
                                            onSelectChange(d)
                                        }}
                                    >
                                        <div>{d.name}</div>
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === d.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            )}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {value && <button onClick={() => {
                setValue('')
                onSelectChange({name: '', id: ''})
            }} className="p-1 rounded-full hover:opacity-50 transition-opacity">
                <X/></button>}
        </div>
    )
}
