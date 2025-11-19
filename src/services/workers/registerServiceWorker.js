
export const registerServiceWorker = () => {
    console.log("trying to start worker ...")
    if ('serviceWorker' in navigator) {
        if (document.readyState === "complete" || document.readyState === "interactive") 
            registerSW()
        else {
            console.log("waiting for window load")
            window.addEventListener("load", registerSW)
        }
    }
}
function registerSW() {
    navigator.serviceWorker
        .register("/sw.js")
        .then(registration => {
            console.log("SW registered!")

        })
        .catch(err => {
            console.log("SW registration failed: ", err)
        })
}

export const checkOnlineStatus = () => {
    return navigator.onLine
}
export const setupOnlineStatusListener = (callback) => {
    window.addEventListener('online', () => {
        callback(true)
    })
    window.addEventListener('offline', () => {
        callback(false)
    })
}
