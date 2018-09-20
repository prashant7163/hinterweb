import { PicObject } from "./pic-object";

export class MilestoneObject{
    dateCreated: string;
    id: string;
    place: string;
    text: string;
    time: string;
    photos: PicObject[];
    likesCount: number;
    commentCount: number;
    liked: string;
    hintsJSONArray: string;
    pluggedWith: any[];
    latitude: string;
    status: string;
    dateModified: string;
    longitude: string;
    total:string;
    completed:string;
    imageId:string;
}