import { PicObject } from "./pic-object";

export class TapeObject{
    dateCreated:string;
    id:string;
    place:string;
    text:string;
    time:string;
    photos:PicObject[];
    likesCount:number;
    commentCount:number;
    liked:string;
}