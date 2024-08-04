import { generateReactHelpers } from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const { uploadFiles } = generateReactHelpers<OurFileRouter>()

export const uploadImageToUploadthing = async (imageFile: File): Promise<string | undefined> => {
    try {
        const [uploadthingRes] = await uploadFiles("imageUploader", { files: [imageFile] })
        return uploadthingRes?.url
    } catch (e) {
        console.error(e)
    }
}
