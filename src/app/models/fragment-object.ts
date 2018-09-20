import { PicObject } from "./pic-object";
import { UserObject } from "./UserObject";
import { TargetObject } from "./target-object";
import { TapeObject } from "./tape-object";
import { MilestoneObject } from "./milestone-object";

export class FragmentObject {
    text: string;
    type: string;
    email: string;
    id: string;
    timelineType: string;
    milestone: MilestoneObject;
    target: TargetObject;
    tape: TapeObject;
    belongsTo: string;
    user: UserObject;
    photo: PicObject;
}