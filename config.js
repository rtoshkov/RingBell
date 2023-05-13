import {promisify} from "util";
import {readFile} from "fs";


async function  readRefreshTokenFile(){
    const currentConfig =  await promisify(readFile)('readFile.env')
    return currentConfig.toString()
}

export let refreshToken = await readRefreshTokenFile();