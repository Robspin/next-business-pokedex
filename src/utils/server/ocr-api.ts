"use server"
type OcrApiResponse = {
    ParsedResults: {
        ParsedText: string
    }[]
}

export const ocrApiParseFile = async (prevState: any, formData: FormData): Promise<{ message: string, data: string | null, success: boolean }> => {
    const file = formData.get('file') as File
    if (!file) return { message: 'No file uploaded', data: null, success: false }

    try {
        formData.append('apikey', process.env.OCR_API_KEY ?? '')

        const res = await (await fetch('https://api.ocr.space/parse/image', { method: 'POST', body: formData })).json() as OcrApiResponse
        console.log(res.ParsedResults[0].ParsedText)
        return { message: 'Success!', data: res.ParsedResults[0].ParsedText, success: true }
    } catch (e) {
        console.log(e)
        return { message: String(e), data: null, success: false }
    }
}