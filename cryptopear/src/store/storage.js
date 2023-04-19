import { network } from '../pages/home/Home';
import { userSession, gaiaStorage } from './wallet'

export const storage = {
    upload: async (fileName, file) => {
        try {
            const result = await gaiaStorage.putFile(fileName, file, { encrypt: false });
            return { success: true, result: result }
        } catch (error) {
            console.log(error)
            return { success: false, result: [] }
        }
    },
    delete: async (fileName) => {
        try {
            const result = await gaiaStorage.deleteFile(fileName)
            return { success: true, result: result }
        } catch (error) {
            console.log(error)
            return { success: false, result: [] }
        }
    },
    getUserConfig: async (fileName = 'config.json') => {
        try {
            const result = await gaiaStorage.getFile(fileName, { decrypt: false });
            return { success: true, networkState: result }
        } catch (error) {
            console.log(error)
            return { success: false, networkState: [] }
        }

    },
    putUserConfig: async (config, fileName = 'config.json') => {
        try {
            const result = await gaiaStorage.putFile(fileName, JSON.stringify(config), { encrypt: false })
            return { success: true }
        } catch (error) {
            console.log(error)
            return { success: false }
        }
    }
}