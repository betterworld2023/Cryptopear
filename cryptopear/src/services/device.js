
export const getDeviceInfo = () => {
    return {
        browser: navigator.userAgent,
        platform: navigator.platform,
        osName: navigator.platform.split(' ')[0]
    }
}