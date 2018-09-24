import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AppModuleHttpService } from '../../services/app-module-http.service';
import { ApplicationInteractor } from '../../models/application-interactor';
import { MessageService } from '../../services/messages.service';
import { DataObject } from '../../models/data-object';
import { ConstantFunctions } from '../../services/constant-functions';
import { FragmentObject } from '../../models/fragment-object';
import { UserObject } from '../../models/UserObject';
import { PicObject } from '../../models/pic-object';
import { MilestoneObject } from '../../models/milestone-object';
import { TargetObject } from '../../models/target-object';
import { TapeObject } from '../../models/tape-object';

@Component({
  selector: 'app-feedcomponent',
  templateUrl: './feedcomponent.component.html',
  styleUrls: ['./feedcomponent.component.scss']
})
export class feedcomponentComponent implements OnInit, AfterViewInit {

  newsRes: DataObject[] = [];
  loading: boolean = false;
  @ViewChild("feedMainContainer") feedMainContainer: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document, private titleService: Title,
    private route: ActivatedRoute, private appServices: AppModuleHttpService, private router: Router
    , private messageService: MessageService, private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.setTitle("feed");
    this.getFeedData("");
  }

  ngAfterViewInit() {

  }

  getFeedData(queryString: string) {
    this.messageService.sendLoaderMessage(true);
    this.loading = true;
    this.appServices.getFeedData(queryString).subscribe((res) => {
      if (res && res.body && res.body.status == "success") {
        if (res.body.data && res.body.data.length > 0) {
          // this.newsRes = res.body.data;
          for (var i = 0; i < res.body.data.length; ++i) {
            this.newsRes.push(res.body.data[i]);
          }
        }
      }
      this.messageService.sendLoaderMessage(false);
      this.loading = false;
    });
  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getHeaderText(feedData: DataObject): string {
    let retStr: string = "";
    let fragments: FragmentObject[] = feedData.fragments;
    if (fragments) {
      for (let li: number = 0; li < fragments.length; li++) {
        let fragment: FragmentObject = fragments[li];
        if (fragment) {
          fragment.text = fragment.text.replace('<', ' ');
          fragment.text = fragment.text.replace('>', ' ');
          retStr = retStr + fragment.text;
          retStr = retStr
            .replace(/\\u(....)/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
            .replace(/\\(\d{3})/g, (match, p1) => String.fromCharCode(parseInt(p1, 8)));
        }
      }
    }
    if (retStr != null) {

    }
    return retStr;
  }

  getuserImage(feedData: DataObject): any {
    let retStr: any;
    let userObject: UserObject = this.getUserDataFromFragment(feedData);
    if (userObject != undefined) {
      retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getProfileThumbnailImageUrl(userObject.email, userObject.dpTime) + "')");
    } else {
      retStr = '';
    }
    return retStr;
  }

  getFeedImage(feedData: DataObject, pos: number): any {
    let retStr: any;
    let cellType: number = this.getFragmentType(feedData.cellType);
    if (cellType == 1) {
      let milestoneObj: MilestoneObject = this.getMileStoneDataFromFragment(feedData);
      if (milestoneObj != undefined && milestoneObj.photos != null && milestoneObj.photos.length > 0) {
        retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getMainImageUrl(milestoneObj.photos[0].id) + "')");
      }
    } else if (cellType == 2) {
      let targetObj: TargetObject = this.getTargetDataFromFragment(feedData);
      if (targetObj != undefined && targetObj.photos != null && targetObj.photos.length > 0) {
        retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getMainImageUrl(targetObj.photos[0].id) + "')");
      }
    }
    else if (cellType == 3) {
      let tapeObject: TapeObject = this.getTapeDataFromFragment(feedData);
      if (tapeObject != undefined && tapeObject.photos != null && tapeObject.photos.length > 0) {
        retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getMainImageUrl(tapeObject.photos[0].id) + "')");
      }
    }
    else if (cellType == 4) {
      let picObject: PicObject = this.getPhotoDataFromFragment(feedData);
      if (picObject != null && picObject.id) {
        retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getMainImageUrl(picObject.id) + "')");
      }
    }

    if (retStr == null) {
      retStr = this.domSanitizer.bypassSecurityTrustStyle("url('" + ConstantFunctions.getRandomBackground(pos) + "')");
    }

    return retStr;
  }

  getPostElapsedTime(feedData: DataObject): string {
    if (feedData && feedData.time) {
      try {
        let entryTime: number = parseFloat(feedData.time);
        let entryDate = new Date();
        entryDate.setTime(entryTime);
        return ConstantFunctions.getMonthStr(entryDate.getMonth()) + " " + entryDate.getDate() + ", " + entryDate.getFullYear();
      } catch (ex) {

      }

    }
    return '';
  }

  getFragmentType(cellType: string): number {
    if (cellType.toLowerCase() == 'milestone') {
      return 1;
    }
    if (cellType.toLowerCase() == 'target') {
      return 2;
    }
    if (cellType.toLowerCase() == 'tape') {
      return 3;
    }
    if (cellType.toLowerCase() == 'photo') {
      return 4;
    }
    return 0;
  }

  getUserDataFromFragment(feedData: DataObject): UserObject {
    if (feedData && feedData.fragments) {
      for (let li: number = 0; li < feedData.fragments.length; li++) {
        let fragment: FragmentObject = feedData.fragments[li];
        if (fragment && fragment.type.toLowerCase() == 'user') {
          return fragment.user;
        }
      }
    }
    return null;
  }

  getPhotoDataFromFragment(feedData: DataObject): PicObject {
    if (feedData && feedData.fragments) {
      for (let li: number = 0; li < feedData.fragments.length; li++) {
        let fragment: FragmentObject = feedData.fragments[li];
        if (fragment && fragment.type.toLowerCase() == 'photo') {
          return fragment.photo;
        }
      }
    }
    return null;
  }

  getMileStoneDataFromFragment(feedData: DataObject): MilestoneObject {
    if (feedData && feedData.fragments) {
      for (let li: number = 0; li < feedData.fragments.length; li++) {
        let fragment: FragmentObject = feedData.fragments[li];
        if (fragment && fragment.type.toLowerCase() == 'milestone') {
          return fragment.milestone;
        }
      }
    }
    return null;
  }

  getTargetDataFromFragment(feedData: DataObject): TargetObject {
    if (feedData && feedData.fragments) {
      for (let li: number = 0; li < feedData.fragments.length; li++) {
        let fragment: FragmentObject = feedData.fragments[li];
        if (fragment && fragment.type.toLowerCase() == 'target') {
          return fragment.target;
        }
      }
    }
    return null;
  }

  getTapeDataFromFragment(feedData: DataObject): TapeObject {
    if (feedData && feedData.fragments) {
      for (let li: number = 0; li < feedData.fragments.length; li++) {
        let fragment: FragmentObject = feedData.fragments[li];
        if (fragment && fragment.type.toLowerCase() == 'tape') {
          return fragment.tape;
        }
      }
    }
    return null;
  }

  getCellTypeImageSource(feedData: DataObject): string {
    let cellType: number = this.getFragmentType(feedData.cellType);
    if (cellType == 1) {
      return '/assets/images/icons/ico_milestoneflag.png';
    }
    else if (cellType == 2) {
      return '/assets/images/icons/ico_target_white.png';
    }
    else if (cellType == 3) {
      return '/assets/images/icons/ico_moment.png';
    }
    else if (cellType == 4) {
      return '/assets/images/icons/ico_type_photo.png';
    }

    return '';
  }

  getImageClassType(feedData: DataObject): string {
    let cellType: number = this.getFragmentType(feedData.cellType);
    if (cellType == 1) {
      return 'feed-tile-milestone-bg';
    }
    else if (cellType == 2) {
      return 'feed-tile-target-bg';
    }
    else if (cellType == 3) {
      return 'feed-tile-tape-bg';
    }
    else if (cellType == 4) {
      return 'feed-tile-photo-bg';
    }

    return '';
  }

  getTileTitle(feedData): string {
    let cellType: number = this.getFragmentType(feedData.cellType);
    let titleStr: string = null;
    if (cellType == 1) {
      let milestoneObj: MilestoneObject = this.getMileStoneDataFromFragment(feedData);
      if (milestoneObj != undefined) {
        titleStr = milestoneObj.text;
      }
    } else if (cellType == 2) {
      let targetObj: TargetObject = this.getTargetDataFromFragment(feedData);
      if (targetObj != undefined) {
        titleStr = targetObj.text;
      }
    }
    else if (cellType == 3) {
      let tapeObject: TapeObject = this.getTapeDataFromFragment(feedData);
      if (tapeObject != undefined) {
        titleStr = tapeObject.text;
      }
    }
    else if (cellType == 4) {
      let picObject: PicObject = this.getPhotoDataFromFragment(feedData);
      if (picObject != undefined) {
        titleStr = null;
      }
    }
    if (titleStr) {
      titleStr = titleStr
        .replace(/\\u(....)/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
        .replace(/\\(\d{3})/g, (match, p1) => String.fromCharCode(parseInt(p1, 8)));
    }
    return titleStr;
  }

  getLikesCount(feedData): string {
    let cellType: number = this.getFragmentType(feedData.cellType);
    let likeCount: number = 0;
    if (cellType == 1) {
      let milestoneObj: MilestoneObject = this.getMileStoneDataFromFragment(feedData);
      if (milestoneObj != undefined) {
        likeCount = milestoneObj.likesCount;
      }
    } else if (cellType == 2) {
      let targetObj: TargetObject = this.getTargetDataFromFragment(feedData);
      if (targetObj != undefined) {
        likeCount = targetObj.likesCount;
      }
    }
    else if (cellType == 3) {
      let tapeObject: TapeObject = this.getTapeDataFromFragment(feedData);
      if (tapeObject != undefined) {
        likeCount = tapeObject.likesCount;
      }
    }
    else if (cellType == 4) {
      let picObject: PicObject = this.getPhotoDataFromFragment(feedData);
      if (picObject != undefined) {
        likeCount = picObject.likesCount;
      }
    }
    if (likeCount == 1) {
      return "1 like";
    } else if (likeCount > 1) {
      return likeCount + " likes";
    }
    return "like";
  }

  getCommentsCount(feedData): string {
    let cellType: number = this.getFragmentType(feedData.cellType);
    let commentCount: number = 0;
    if (cellType == 1) {
      let milestoneObj: MilestoneObject = this.getMileStoneDataFromFragment(feedData);
      if (milestoneObj != undefined) {
        commentCount = milestoneObj.commentCount;
      }
    } else if (cellType == 2) {
      let targetObj: TargetObject = this.getTargetDataFromFragment(feedData);
      if (targetObj != undefined) {
        commentCount = targetObj.commentCount;
      }
    }
    else if (cellType == 3) {
      let tapeObject: TapeObject = this.getTapeDataFromFragment(feedData);
      if (tapeObject != undefined) {
        commentCount = tapeObject.commentCount;
      }
    }
    else if (cellType == 4) {
      let picObject: PicObject = this.getPhotoDataFromFragment(feedData);
      if (picObject != undefined) {
        commentCount = picObject.commentsCount;
      }
    }
    if (commentCount == 1) {
      return "1 comment";
    } else if (commentCount > 1) {
      return commentCount + " comments";
    }
    return "comment";
  }

  getHintsArray(feedData: DataObject): string[] {
    let retArr: string[] = [];
    if (feedData && feedData.hints) {
      retArr = JSON.parse(feedData.hints);
      retArr[4] = retArr[4].replace(/"/g, " ");
    }
    return retArr;
  }

  isHintAvailable(feedData): boolean {
    if (feedData && feedData.hints) {
      return true;
    }
    return false;
  }

  onFeedScroll() {

    if (this.loading == false && this.feedMainContainer.nativeElement.scrollTop + this.feedMainContainer.nativeElement.clientHeight + 300 > this.feedMainContainer.nativeElement.scrollHeight) {
      let feedData: DataObject = this.newsRes[this.newsRes.length - 1];
      let queryString: string = "?feedTime=" + feedData.time + "&type=old";
      this.getFeedData(queryString);
    }
  }

  tileClickHandler(feedData: DataObject): void {
    let cellType: number = this.getFragmentType(feedData.cellType);
    let urlData: string = feedData.cellType;
    if (cellType == 1) {
      let milestoneObj: MilestoneObject = this.getMileStoneDataFromFragment(feedData);
      if (milestoneObj != undefined) {
        urlData = urlData + "/" + milestoneObj.id;
      } else {
        return;
      }
    } else if (cellType == 2) {
      let targetObj: TargetObject = this.getTargetDataFromFragment(feedData);
      if (targetObj != undefined) {
        urlData = urlData + "/" + targetObj.id;
      } else {
        return;
      }
    }
    else if (cellType == 3) {
      let tapeObject: TapeObject = this.getTapeDataFromFragment(feedData);
      if (tapeObject != undefined) {
        urlData = urlData + "/" + tapeObject.id;
      } else {
        return;
      }
    } else {
      return;
    }
    if (ApplicationInteractor.isDev) {
      urlData = "dev/" + urlData;
    }
    urlData = btoa(urlData);
    this.router.navigate([urlData]);
  }
}
