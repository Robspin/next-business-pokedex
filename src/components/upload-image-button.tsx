"use client"
import { Button } from '@/components/ui/button'
import { FileImage } from 'lucide-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { anthropicParseImage } from '@/utils/server/anthropic-api'

function imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

export default function UploadImageButton() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleButtonClick = () => {
        if (fileInputRef?.current) fileInputRef?.current.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        setLoading(true)

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const base64Image = await imageToBase64(selectedFile)
            const { data } = await anthropicParseImage(base64Image)

            if (data) {
                const searchParams = new URLSearchParams()
                Object.entries(data).forEach(([key, value]) => {
                    searchParams.append(key, value)
                });

                router.push(`/cards/new?${searchParams.toString()}`)
            } else {
                console.log('Something went wrong getting the data from server action')
            }
        }
    }

    return (
        <div className="flex">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                name="file"
                accept="image/*"
            />
            <Button variant="outline" className="w-full" onClick={handleButtonClick} disabled={loading}>
                {loading ? <Image src="/spinner.gif" alt="Loading spinner" height={12} width={12} className="mr-2"/> :
                <FileImage size={20} className="mr-2 -ml-1"/>}
                Upload image
            </Button>
        </div>
    )
}