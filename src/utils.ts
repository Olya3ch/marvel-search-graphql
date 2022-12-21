import { Md5 } from "ts-md5";
import * as dotenv from "dotenv";

dotenv.config();

const ts = new Date().getTime();
const publicKeyApi = process.env.MARVEL_API_PUBLIC_KEY!;
const stringToHash = ts + process.env.MARVEL_API_PRIVATE_KEY! + publicKeyApi;
const hash = Md5.hashStr(stringToHash);

export const apiUrl = "https://gateway.marvel.com:443/v1/public";
export const apiCredentials = `ts=${ts}&apikey=${publicKeyApi}&hash=${hash}`;
