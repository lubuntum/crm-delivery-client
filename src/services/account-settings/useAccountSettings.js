import { useEffect, useState } from "react"

export const useAccountSettings = () => {
    const [settings, setSettings] = useState(JSON.parse(localStorage.getItem("settings")) ? JSON.parse(localStorage.getItem("settings")) : {offlineMode:false})
    
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings))
    }, [settings])

    const updateSettings = (updatedSettings) => {
        setSettings((prev) => ({...prev, ...updatedSettings}))
    }
    return {
        settings,
        setSettings,
        updateSettings
	}
}