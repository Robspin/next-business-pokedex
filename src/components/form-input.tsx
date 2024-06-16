import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldValues } from 'react-hook-form'
import { capitalizeFirstLetter } from '@/utils/helpers'
import { HTMLInputTypeAttribute } from 'react'

interface Props extends FieldValues {
    name: string
    formControl: Control<any>
    inputType?: HTMLInputTypeAttribute | undefined
    disableInput?: boolean
    inputMax?: string
    inputMin?: string
}

export default function FormInput({ name, formControl, inputType, inputMin, inputMax, disableInput, ...props }: Props) {
    return (
        <FormField
            control={formControl}
            name={name}
            defaultValue=""
            {...props}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{capitalizeFirstLetter(name).replace('_', ' ')}</FormLabel>
                    <FormControl>
                        <Input type={inputType} disabled={disableInput} min={inputMin} max={inputMax} placeholder={`Enter ${name}...`} {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
