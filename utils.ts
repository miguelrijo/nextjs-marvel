import axios from "axios";
import { Md5 } from "ts-md5";
import { MARVEL_BASE_ROUTE, MARVEL_PATHS } from "./contants";
import { MarvelResponse } from "./models-marvel";


export const callMarvel = async <R extends MarvelResponse> (route: MARVEL_PATHS, pathVars: Map<string, string> = new Map(), extraParams:Map<string, string> = new Map()): Promise<R> => {
    const md5 = new Md5();
    const apikey: any = process.env.NEXT_PUBLIC_MARVEL_KEY;
    const ts = new Date().getMilliseconds().toString();
    const privateKey: any = process.env.MARVEL_SECRET_KEY;
    const md5Hash = md5.appendAsciiStr(ts).appendAsciiStr(privateKey).appendAsciiStr(apikey).end();

    let path: string = route + `?apikey=${apikey}&ts=${ts}&hash=${md5Hash}`;

    pathVars.forEach((pathVarValue, pathvarKey) => {
        path = path.replace(pathvarKey, pathVarValue);
    });

    extraParams.forEach((urlParamValue, urlParamKey) => {
        path += "&" + urlParamKey + "=" + urlParamValue;
    });

  
    const data = await axios.get(MARVEL_BASE_ROUTE + path );
    return data.data;
}