import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppModuleHttpService {

    baseUrl:string = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    // baseUrl:string = "https://hinter.sg/hinterapi";
    // baseUrl:string = "https://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com/hinterapi";

    constructor(
        private http: HttpClient) {

    }

    getEntryDetailInfo(eventType:string,entryId:string): Observable<any> {
        return this.http.get<any>((this.baseUrl + "/web/"+eventType+"/"+entryId),  {
            observe: 'response'
        });
    }

    getUserDetailInfo(userId:string): Observable<any> {
        return this.http.get<any>((this.baseUrl + "/web/user?id="+userId),  {
            observe: 'response'
        });
    }
}