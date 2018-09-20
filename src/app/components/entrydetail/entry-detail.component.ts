import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModuleHttpService } from '../../services/app-module-http.service';
import { DataObject } from '../../models/data-object';
import { BaseResponse } from '../../models/base-response';
import { MessageService } from '../../services/messages.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstantFunctions } from '../../services/constant-functions';


@Component({
  selector: 'entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})


export class EntryDetailComponent implements OnInit, AfterViewInit {

  detailResponse: DataObject;

  constructor(private route: ActivatedRoute, private appServices: AppModuleHttpService,
    private messageService: MessageService, private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let id: string = params.get('id');
        id = atob(id);
        if (id != null) {
          let idSplit: string[] = id.split("/");
          if (idSplit != null && idSplit.length > 1) {
            if (idSplit[idSplit.length - 2].toLowerCase() == 'findme' || idSplit[idSplit.length - 2].toLowerCase() == 'user') {

            } else {
              this.messageService.sendLoaderMessage(true);
              this.appServices.getEntryDetailInfo(idSplit[idSplit.length - 2], idSplit[idSplit.length - 1]).subscribe((res: any) => {
                this.messageService.sendLoaderMessage(false);
                if (res && res.body) {
                  let baseResponse: BaseResponse = res.body;
                  if (baseResponse && baseResponse.data && baseResponse.data.length > 0) {
                    this.detailResponse = baseResponse.data[0];
                  }
                }
              });
            }
          }

        }
      }
    );
  }

  ngAfterViewInit() {

  }

  getuserImage(): any {
    let retStr: any;
    if (this.detailResponse != undefined && this.detailResponse.user != undefined) {
      retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getProfileThumbnailImageUrl(this.detailResponse.user.email, this.detailResponse.user.dpTime) + "')");
    } else {
      retStr = '';
    }
    return retStr;
  }
  getMainImage(): any {
    let retStr: any;
    if (this.detailResponse != undefined && this.detailResponse.photos != undefined && this.detailResponse.photos.length > 0) {
      retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getMainImageUrl(this.detailResponse.photos[0].id) + "')");
    } else {
      retStr = '';
    }
    return retStr;
  }

  getPostElapsedTime(): string {
    if (this.detailResponse && this.detailResponse.time) {
      try {
        let entryTime: number = parseFloat(this.detailResponse.time);
        let entryDate = new Date();
        entryDate.setTime(entryTime);
        return ConstantFunctions.getMonthStr(entryDate.getMonth()) + " " + entryDate.getDate() + ", " + entryDate.getFullYear();
      } catch (ex) {

      }

    }
    return '';
  }

  getHintsArray(): string[] {
    let retArr: string[] = [];
    if (this.detailResponse && this.detailResponse.hintsJSONArray) {
      retArr = JSON.parse(this.detailResponse.hintsJSONArray);
      retArr[4] = retArr[4].replace(/"/g, " ");
    }
    return retArr;
  }

  isHintAvailable(): boolean {
    if (this.detailResponse && this.detailResponse.hintsJSONArray) {
      return true;
    }
    return false;
  }

  getLikesCount(): string {
    let likeCount: number = 0;
    if (this.detailResponse && this.detailResponse.likes) {
      try{
        likeCount = parseInt(this.detailResponse.likes.count);
      }catch(ex){

      }
      
    }
    if (likeCount == 1) {
      return "1 like";
    } else if (likeCount > 1) {
      return likeCount + " likes";
    }
    return "like";
  }

  getCommentsCount(): string {
    let commentCount: number = 0;
    if (this.detailResponse && this.detailResponse.commentsCount) {
      commentCount = this.detailResponse.commentsCount;
    }
    if (commentCount == 1) {
      return "1 comment";
    } else if (commentCount > 1) {
      return commentCount + " comments";
    }
    return "comment";
  }

  getThanksCount(): string {
    let thankCount: number = 0;
    if (this.detailResponse && this.detailResponse.thanks) {
      try{
        thankCount = parseInt(this.detailResponse.thanks.count);
      }catch(ex){

      }
      
    }
    if (thankCount == 1) {
      return "1 thank";
    } else if (thankCount > 1) {
      return thankCount + " thanks";
    }
    return "thank";
  }
}