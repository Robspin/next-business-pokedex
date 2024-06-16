import { toast } from 'sonner'


const serverPromiseHandler = (serverFunction: () => Promise<any>): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await serverFunction()
            return resolve(res)
        } catch (e) {
            return reject(e)
        }
    })
}

type ServerRequestHandlerProps = {
    serverFunction: () => Promise<any>
    successMessage?: string
    onSuccess?: (res?: any) => any
    onError?: (e?: any) => any
}

export const serverRequestHandler = async ({ serverFunction, successMessage, onSuccess, onError }: ServerRequestHandlerProps) => {
    toast.promise(async () => await serverPromiseHandler(serverFunction), {
        loading: 'Handling request...',
        success: (response) => {
            if (onSuccess) onSuccess(response)
            return successMessage ?? 'Success!'
        },
        error: (e: any) => {
            if (onError) onError(e)
            return `Request failed! ${e}`
        },
    })
}
