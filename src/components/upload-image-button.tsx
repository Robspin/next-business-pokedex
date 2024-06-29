"use client"
import { Button } from '@/components/ui/button'
import { FileImage } from 'lucide-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import NextImage from 'next/image'
import { anthropicParseImage } from '@/utils/server/anthropic-api'

function imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

function resizeBase64Image(base64: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const img = new Image()
        img.src = base64
        img.onload = () => {
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, width, height)

            const newBase64 = canvas.toDataURL('image/jpeg', 0.5)
            resolve(newBase64)
        }
        img.onerror = reject
    })
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
            const resizedBase64Image = await resizeBase64Image(base64Image, 800, 600)
            const { data } = await anthropicParseImage(resizedBase64Image)

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
            <Button className="w-full" onClick={handleButtonClick} disabled={loading}>
                {loading ? <NextImage src="/spinner.gif" alt="Loading spinner" height={12} width={12} className="mr-2"/> :
                <FileImage size={20} className="mr-2 -ml-1"/>}
                Upload image
            </Button>
        </div>
    )
}