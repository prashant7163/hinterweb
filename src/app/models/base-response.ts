import { DataObject } from "./data-object";

export class BaseResponse{
    status:string;
    message:string;
    messages:any[];
    data:DataObject[];
}