import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AppModuleHttpService {

    baseUrl_dev:string = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    baseUrl_prod:string = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    // baseUrl:string = "https://hinter.sg/hinterapi";
    // baseUrl:string = "https://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com/hinterapi";

    constructor(
        private http: HttpClient) {

    }

    getEntryDetailInfo(eventType:string,entryId:string,isDev:boolean): Observable<any> {
        let baseUrl:string = this.baseUrl_prod;
        if(isDev){
            baseUrl = this.baseUrl_dev;
        }
        return this.http.get<any>((baseUrl + "/web/"+eventType+"/"+entryId),  {
            observe: 'response'
        });
    }

    getUserDetailInfo(userId:string,isDev:boolean): Observable<any> {
        let baseUrl:string = this.baseUrl_prod;
        if(isDev){
            baseUrl = this.baseUrl_dev;
        }
        return this.http.get<any>((baseUrl + "/web/user?id="+userId),  {
            observe: 'response'
        });
    }
}