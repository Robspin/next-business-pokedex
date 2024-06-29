"use server"
import Anthropic from "@anthropic-ai/sdk"

type MimeType = "image/png" | "image/jpeg" | "image/gif" | "image/webp"

const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"]
})


export const anthropicParseImage = async (base64Image: string): Promise<{ message: string, data: string | null, success: boolean }> => {
    const baseResponse = {
        success: false,
        message: 'Something went wrong',
        data: null
    }

    const mimeTypeMatch = base64Image.match(/^data:image\/(\w+);base64,/)
    let fileExtension = 'png'
    let mimeType: MimeType = 'image/png'

    if (mimeTypeMatch) {
        fileExtension = mimeTypeMatch[1];
        mimeType = `image/${fileExtension}` as MimeType
    }

    const cleanedBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '')

    const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        system: "\nCan you parse the following data from this business card and return it in json format?\n\nThe keys I am looking for are:\n\nname,\ntitle,\ncompany,\nphone,\nmobile,\nemail\n\nIf you can't find the value then you can leave an empty string.\nPlease reply with only the json.",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": mimeType,
                            "data": cleanedBase64
                        }
                    }
                ]
            }
        ]
    })

    const contentBlock = response.content[0] as any

    if (contentBlock?.text) {
        return {
            message: 'Success!',
            data: JSON.parse(contentBlock?.text),
            success: true
        }
    } else {
        return baseResponse
    }
}
