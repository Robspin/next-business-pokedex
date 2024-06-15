"use client"

import { useEffect } from 'react'

export default function ClientAutoRefresh() {
    useEffect(() => {
        window.location.reload()
    }, [])

    return <div />
}