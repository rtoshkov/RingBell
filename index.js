import {RingApi} from 'ring-client-api'
import {refreshToken} from './config.js'
import {readFile, writeFile} from "fs";
import {promisify} from "util";


const ringApi = new RingApi({
    refreshToken: refreshToken,
    cameraStatusPollingSeconds: 20,
})

ringApi.onRefreshTokenUpdated.subscribe(
    async ({newRefreshToken, oldRefreshToken}) => {
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


async function recordVideo(sec=600, record=false){
    do{
        const currentDate = new Date();
        const fileName = 'Ring-'
            + currentDate.getFullYear()
            + '-' + (currentDate.getUTCMonth() + 1)
            + '-' + currentDate.getDate()
            + '-' + currentDate.getHours() + '_'
            + currentDate.getMinutes() + '.mp4';

        const result = await myCamera.recordToFile(fileName, sec)
        console.log('RECORDER: ' + fileName)
    }
    while(record);
}


// Да записва при нотификация за движение
myCamera.onMotionDetected.subscribe((data) => {
    recordVideo(120) // Цифрата е колко секунди да записва
})


// Разкоментирай долният ред ако искаш да включиш непрекъснат запис и !! Закоментирай горните три реда за да махнеш записа при движение.
// recordVideo(60, true)

