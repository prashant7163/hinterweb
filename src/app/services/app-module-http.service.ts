import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationInteractor } from '../models/application-interactor';
import { Constants } from '../models/constants';


@Injectable()
export class AppModuleHttpService {

   

    constructor(
        private http: HttpClient) {

    }

    getHeaders(addAuth: boolean): any {
        let headers: HttpHeaders;
        if (addAuth) {
            headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'authToken': ApplicationInteractor.authToken,
                    'email': ApplicationInteractor.userEmail

                }
            )
        } else {
            headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json'
                }
            )
        }
        return headers;
    }

    getEntryDetailInfo(eventType: string, entryId: string): Observable<any> {
        let baseUrl: string = Constants.baseApiUrl_prod;
        if (ApplicationInteractor.isDev) {
            baseUrl = Constants.baseApiUrl_dev;
        }
        baseUrl = baseUrl + "post/";
        if(eventType.toLowerCase()=='milestone'){
            baseUrl = baseUrl + "entry/milestone/";
        }else if(eventType.toLowerCase()=='target'){
            baseUrl = baseUrl + "target/";
        }else if(eventType.toLowerCase()=='tape'){
            baseUrl = baseUrl + "entry/tape/";
        }
        return this.http.get<any>((baseUrl +  entryId + "/get"), {
            headers: this.getHeaders(true),
            observe: 'response'
        });
    }

    getUserDetailInfo(userId: string): Observable<any> {
        let baseUrl: string = Constants.baseApiUrl_prod;
        if (ApplicationInteractor.isDev) {
            baseUrl = Constants.baseApiUrl_dev;
        }
        return this.http.get<any>((baseUrl + "/web/user?id=" + userId), {
            observe: 'response'
        });
    }

    getFeedData(queryString: string): Observable<any> {
        let baseUrl: string = Constants.baseApiUrl_prod;
        if (ApplicationInteractor.isDev) {
            baseUrl = Constants.baseApiUrl_dev;
        }
        baseUrl = baseUrl + "get";
        return this.http.get<any>((baseUrl + "/activity/newsfeed" + queryString), {
            headers: this.getHeaders(true),
            observe: 'response'
        });
    }
}