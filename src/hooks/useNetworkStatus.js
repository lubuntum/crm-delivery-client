import { useEffect, useState } from "react"
import { checkServerHealth } from "../services/api/healthApi"

export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true)
    const checkOnline = async () => {
        try {
            return ((await checkServerHealth()).data.status === "OK")
        } catch(err) {
            setIsOnline(false)
            return (false)
        }
    }
    return {
        isOnline,
        checkOnline
    }
}