import { environment } from "../../environments/environment";



export class Constants{
    static baseApiUrl_dev: string = environment.dataUrl+"hs/dev/";
    static baseApiUrl_prod: string = environment.dataUrl+"hs/prod/";
    static baseImageUrl_dev: string = environment.dataUrl+"hsimage/dev/";
    static baseImageUrl_prod: string = environment.dataUrl+"hsimage/prod/";
}