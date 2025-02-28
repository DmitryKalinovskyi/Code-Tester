import { COOKIES_ACCEPTED_KEY as COOKIES_ACCEPTED_KEY } from "./storageKeys";

export default function isCookiesAccepted(): boolean{
    const token = localStorage.getItem(COOKIES_ACCEPTED_KEY);

    if(token){
        const parseResult = JSON.parse(token);
        if(typeof parseResult === "boolean"){
            return parseResult;
        }
    }

    return false;
}