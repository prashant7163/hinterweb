import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AppModuleHttpService } from '../../services/app-module-http.service';
import { ApplicationInteractor } from '../../models/application-interactor';

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css']
})
export class HomecomponentComponent implements OnInit {

  isApple:boolean = false;
  isDev: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private titleService: Title, private route: ActivatedRoute, private appServices: AppModuleHttpService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let id: string = params.get('id');
        id = atob(id);
        var userAgent = navigator.userAgent || navigator.vendor;
        if (/android/i.test(userAgent)) {
          window.location.href = "https://goo.gl/xcZT2a";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) ) {
          this.isApple = true;
          // if(/safari/i.test(userAgent)){
            if(id.indexOf('dev')==-1){
              window.location.href = "com.solution.hinter://"+params.get('id');
            }else{
              window.location.href = "com.solution.hinterdev://"+params.get('id');
            }
            setTimeout(()=>{
              window.location.href = "https://goo.gl/fGGi8d";
            },2000);
          // }else{
          //   window.location.href = "https://goo.gl/fGGi8";
          // }
        }
        if (id != null) {
          if (id.indexOf('dev') != -1) {
            this.isDev = true;
          }
          let idSplit: string[] = id.split("/");
          if (idSplit != null && idSplit.length > 1) {
            if (idSplit[idSplit.length - 2].toLowerCase() == 'findme' || idSplit[idSplit.length - 2].toLowerCase() == 'user') {
              this.appServices.getUserDetailInfo(idSplit[idSplit.length - 1], this.isDev).subscribe((res: any) => {
                console.log(res);
                if (res && res.body) {
                  this.createUserSEOTags(res.body);
                }
              });
            } else {
              this.appServices.getEntryDetailInfo(idSplit[idSplit.length - 2], idSplit[idSplit.length - 1], this.isDev).subscribe((res: any) => {
                console.log(res);
                if (res && res.body) {
                  this.createEntrySEOTags(res.body);
                }
              });
            }
          }

        }
      }
    );
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  createUserSEOTags(userDetail: any): void {
    if (userDetail && userDetail.data && userDetail.data.length > 0) {
      let userData: any = userDetail.data[0];
      let seo_title: string = userData.name;
      let seo_desc: string = "";
      if (userData && userData.profile) {
        seo_desc = userData.profile.place;
      }
      let seo_url: string = window.location.href;
      let seo_image: string = (ApplicationInteractor.seoUrl + "/assets/images/logo.png");
      if (userData) {
        if(this.isDev){
          seo_image = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/user/profile/photo/thumb?userId=" + userData.email + "&dpTime=" + userData.dpTime;
        }else{
          seo_image = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/user/profile/photo/thumb?userId=" + userData.email + "&dpTime=" + userData.dpTime;
        }
      }
      this.setTitle(seo_title);
      let linkCanonical: HTMLElement = ApplicationInteractor.getOrCreateLinkElement('canonical', this.document, seo_url);
      linkCanonical.setAttribute("href", seo_url);
      let metaOGTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:title', this.document, 'property');
      metaOGTitle.setAttribute("content", seo_title);
      let metaOGHeadline: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:headline', this.document, 'itemprop');
      metaOGHeadline.setAttribute("content", seo_title);
      let metaOGDescription: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:description', this.document, 'property');
      metaOGDescription.setAttribute("content", seo_desc);
      let metaOGImage: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:image', this.document, 'property');
      metaOGImage.setAttribute("content", seo_image);
      let metaTwitterImage: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:image', this.document);
      metaTwitterImage.setAttribute("content", seo_image);
      let metaTwitterImageSrc: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:image:src', this.document);
      metaTwitterImageSrc.setAttribute("content", seo_image);
      let metaTwitterTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:title', this.document);
      metaTwitterTitle.setAttribute("content", seo_title);
      let metaTwitterDescription: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:description', this.document);
      metaTwitterDescription.setAttribute("content", seo_desc);
      let metaTwitterURL: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:url', this.document);
      metaTwitterURL.setAttribute("content", seo_url);
    }

  }

  hexEncode(str: string) {
    var hex, i;

    var result = "";
    for (i = 0; i < str.length; i++) {
      hex = str.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }

    return result;
  }

  hexDecode(str: string) {
    var j;
    var hexes = str.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
  }

  convertUniCodeToStr(str: string): string {
    console.log(str);
    while (str.indexOf("\\u") != -1) {
      let uIndex: number = str.indexOf("\\u");
      let sIndex: number = str.indexOf(" ", uIndex);
      if (sIndex == -1) {
        sIndex = str.length;
      }
      console.log(uIndex + " " + sIndex);
      let temp: string = str.substring(uIndex, sIndex).trim();
      console.log(temp.trim());
      console.log(this.hexDecode(this.hexEncode(str)));
      console.log(this.hexDecode(this.hexEncode("\uD83D\uDE44")));
      console.log(this.hexDecode(this.hexEncode(temp)));
      str.replace(str.substring(uIndex, sIndex), this.hexDecode(this.hexEncode(str.substring(uIndex, sIndex))));
      console.log(str);
      break;
    }
    return str;
  }

  createEntrySEOTags(eventDetail: any): void {
    if (eventDetail && eventDetail.data && eventDetail.data.length > 0) {
      let eventData: any = eventDetail.data[0];
      let seo_title: string = eventData.text;
      // console.log(seo_title);
      let seo_desc: string = "";
      if (eventData.hintsJSONArray) {
        let hints: string[] = JSON.parse(eventData.hintsJSONArray);
        if (hints) {
          seo_desc = (hints[0]);
          let count: number = 1;
          while (seo_desc.length < 200 && count < hints.length) {
            seo_desc = seo_desc + " " + (hints[count]);
            count++;
          }
          seo_desc.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
          var div = document.createElement("div");
          div.innerHTML = seo_desc;
          seo_desc = div.textContent || div.innerText || seo_desc;
        }
      }
      let seo_keywords: string = eventData.hashtags;
      let seo_url: string = window.location.href;;
      let seo_image: string = (ApplicationInteractor.seoUrl + "/assets/images/logo.png");
      if (eventData.photos && eventData.photos.length > 0) {
        if(this.isDev){
          seo_image = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/" + eventData.photos[0].id + "/thumb";
        }else{
          seo_image = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/" + eventData.photos[0].id + "/thumb";
        }
      }
      this.setTitle(seo_title);
      let linkCanonical: HTMLElement = ApplicationInteractor.getOrCreateLinkElement('canonical', this.document, seo_url);
      linkCanonical.setAttribute("href", seo_url);
      let metaKeywords: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('keywords', this.document)
      metaKeywords.setAttribute("content", seo_keywords);
      let metaOGTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:title', this.document, 'property');
      metaOGTitle.setAttribute("content", seo_title);
      let metaOGHeadline: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:headline', this.document, 'itemprop');
      metaOGHeadline.setAttribute("content", seo_title);
      let metaOGDescription: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:description', this.document, 'property');
      metaOGDescription.setAttribute("content", seo_desc);
      let metaOGImage: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:image', this.document, 'property');
      metaOGImage.setAttribute("content", seo_image);
      let metaTwitterImage: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:image', this.document);
      metaTwitterImage.setAttribute("content", seo_image);
      let metaTwitterImageSrc: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:image:src', this.document);
      metaTwitterImageSrc.setAttribute("content", seo_image);
      let metaTwitterTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:title', this.document);
      metaTwitterTitle.setAttribute("content", seo_title);
      let metaTwitterDescription: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:description', this.document);
      metaTwitterDescription.setAttribute("content", seo_desc);
      let metaTwitterURL: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:url', this.document);
      metaTwitterURL.setAttribute("content", seo_url);
    }

  }

}
