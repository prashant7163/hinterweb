import { BelongToObject } from "./belong-to-object";

export class EntryObject{
    id:string;
    type:string;
    text:string;
    belongsTo:BelongToObject;
}