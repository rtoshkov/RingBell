import {RingApi} from 'ring-client-api'
import {refreshToken} from './config.js'
import {readFile,writeFile} from "fs";
import {promisify} from "util";




const ringApi = new RingApi({
    refreshToken: refreshToken,
    cameraStatusPollingSeconds: 20,
})

ringApi.onRefreshTokenUpdated.subscribe(
    async ({ newRefreshToken, oldRefreshToken }) => {
        console.log('Refresh Token Updated: ', newRefreshToken)
        if (!oldRefreshToken) {
            return
        }

        const currentConfig = await promisify(readFile)('readFile.env'),
            updatedConfig = currentConfig
                .toString()
                .replace(oldRefreshToken, newRefreshToken)

        await promisify(writeFile)('readFile.env', updatedConfig)
    }
)


const locations = await ringApi.getLocations()
const myCamera = locations[0].cameras[0]
myCamera.getSnapshot()



