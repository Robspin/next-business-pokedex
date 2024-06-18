import Image from 'next/image'


export default function Loading() {
    return (
        <div className="w-full py-20 flex justify-center items-center">
            <Image src="/pikachu.gif" alt="Pickachu" height={200} width={200} />
        </div>
    )
}