const dotenv = require('dotenv');


dotenv.config();

// async function  readRefreshTokenFile(){
//     const currentConfig =  await promisify(readFile)('readFile.env')
//     return currentConfig.toString()
// }
//
// let oldToken = await readRefreshTokenFile();

module.exports = {
    // OLD_TOKEN: oldToken,
    TEST: 'test',
}

