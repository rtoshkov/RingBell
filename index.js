import {RingApi} from 'ring-client-api'
import {settings} from "./settings.js";

const ringApi = new RingApi({
    refreshToken:
        settings.refreshToken,

    // The following are all optional. See below for details
    cameraStatusPollingSeconds: 20,
    locationIds: [
        '488e4800-fcde-4493-969b-d1a06f683102',
        '4bbed7a7-06df-4f18-b3af-291c89854d60',
    ],
})


console.log(ringApi)