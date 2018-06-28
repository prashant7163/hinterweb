import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppModuleHttpService {

    baseUrl:string = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";

    constructor(
        private http: HttpClient) {

    }

    getEntryDetailInfo(eventType:string,entryId:string): Observable<any> {
        let  headers = new HttpHeaders(
            {
                'authToken':'09ff19f8-006d-4e90-81a2-a5163750d72e',
                'email':'arjunkapoor.nsit@gmail.com'
            });
        return this.http.post<any>((this.baseUrl + "/entry/"+eventType+"/"+entryId+"/get"), {
            'authToken':'09ff19f8-006d-4e90-81a2-a5163750d72e',
                'email':'arjunkapoor.nsit@gmail.com'
        }, {
            headers: headers,
            observe: 'response'
        });
    }
}