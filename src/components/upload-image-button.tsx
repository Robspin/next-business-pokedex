"use client"
import { Button } from '@/components/ui/button'
import { FileImage } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ocrApiParseFile } from '@/utils/server/ocr-api'
import { useFormState } from 'react-dom'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'


export default function UploadImageButton() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('eng')
    const [state, formAction] = useFormState(ocrApiParseFile, null)
    const router = useRouter()

    const handleButtonClick = () => {
        if (fileInputRef?.current) fileInputRef?.current.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const form = event.target.form
            if (form) {
                const formData = new FormData(form)
                formData.append('language', selectedLanguage)
                formAction(formData)
            }
        } else if (selectedFile) {
            alert('Please select an image file')
            event.target.value = ''
        }
    }

    useEffect(() => {
        if (state?.success) {
            const uploadedText = state.data
            router.push(`/cards/new?uploadedText=${uploadedText}`)
        }
    }, [state])

    return (
        <form action={formAction} className="flex">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                name="file"
                accept="image/*"
            />
            <div className="w-full flex gap-2">
                <Button variant="outline" onClick={handleButtonClick}>
                    <FileImage size={20} className="mr-2 -ml-1"/>
                    Upload image
                </Button>
                <Select defaultValue="eng" onValueChange={(val) => setSelectedLanguage(val)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Card language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="eng">ENG</SelectItem>
                            <SelectItem value="jpn">JPN</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
}