import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformServer, isPlatformBrowser } from '@angular/common';
import { DomAdapter, getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { AppModuleHttpService } from '../../services/app-module-http.service';
import { ApplicationInteractor } from '../../models/application-interactor';

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css']
})
export class HomecomponentComponent implements OnInit {

  isApple: boolean = false;
  isDev: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private _meta: Meta, private titleService: Title, private route: ActivatedRoute, private appServices: AppModuleHttpService, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let id: string = params.get('id');
        if(isPlatformServer(this.platformId)){
          id = this.a2b(id);
        }else{
          id = atob(id);
        }
        // id = atob(id);
        if (typeof navigator != 'undefined') {
          var userAgent = navigator.userAgent || navigator.vendor;
          if (/iPad|iPhone|iPod/.test(userAgent)) {
            this.isApple = true;
            // if(/safari/i.test(userAgent)){
            if (id.indexOf('dev') == -1) {
              window.location.href = "com.solution.hinter://" + params.get('id');
            } else {
              window.location.href = "com.solution.hinterdev://" + params.get('id');
            }
            setTimeout(() => {
              window.location.href = "https://goo.gl/fGGi8d";
            }, 2000);
            // }else{
            //   window.location.href = "https://goo.gl/fGGi8";
            // }
          }
        }
        console.log(id);
        if (id != null) {
          if (id.indexOf('dev') != -1) {
            this.isDev = true;
          }
          let idSplit: string[] = id.split("/");
          console.log(idSplit);
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
      let seo_url: string = '';
      if(isPlatformServer(this.platformId)){
          
      }else{
        seo_url = window.location.href;
      }
      let seo_image: string = (ApplicationInteractor.seoUrl + "/assets/images/logo.png");
      if (userData) {
        if (this.isDev) {
          seo_image = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/user/profile/photo/thumb?userId=" + userData.email + "&dpTime=" + userData.dpTime;
        } else {
          seo_image = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/user/profile/photo/thumb?userId=" + userData.email + "&dpTime=" + userData.dpTime;
        }
      }
      this.setTitle(seo_title);
      if (isPlatformServer(this.platformId)) {
        this._meta.addTag({
          'property': 'og:title',
          content: seo_title
        });
        this._meta.addTag({
          'property': 'og:description',
          content: seo_desc
        });
        this._meta.addTag({
          'property': 'og:image',
          content: seo_image
        });
        this._meta.addTag({
          'name': 'twitter:image',
          content: seo_image
        });
        this._meta.addTag({
          'name': 'twitter:description',
          content: seo_desc
        });
        this._meta.addTag({
          'name': 'twitter:title',
          content: seo_title
        });
        this._meta.addTag({
          'name': 'twitter:card',
          content: 'summary_large_image'
        });
        this._meta.addTag({
          'name': 'twitter:site',
          content: '@Hinter_Social'
        });
        this._meta.addTag({
          'name': 'twitter:creator',
          content: '@Hinter_Social'
        });
      } else {
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
        let metaTwitterTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:title', this.document);
        metaTwitterTitle.setAttribute("content", seo_title);
        let metaTwitterDescription: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:description', this.document);
        metaTwitterDescription.setAttribute("content", seo_desc);
        let metaTwitterURL: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:url', this.document);
        metaTwitterURL.setAttribute("content", seo_url);
        let metaTwitterCard: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:card', this.document);
        metaTwitterCard.setAttribute("content", 'summary_large_image');
        let metaTwitterSite: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:site', this.document);
        metaTwitterSite.setAttribute("content", 'Hinter_Social');
        let metaTwitterCreator: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:creator', this.document);
        metaTwitterCreator.setAttribute("content", 'Hinter_Social');
      }

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

   b2a(a) {
    var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
    if (!a) return a;
    do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e, 
    f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
    return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
  }
  
   a2b(a) {
    var b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length;
    for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
    for (c = 0; j > c; c++) for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; ) ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
    return h;
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
          if(isPlatformServer(this.platformId)){
          
          }else{
            var div = document.createElement("div");
            div.innerHTML = seo_desc;
            seo_desc = div.textContent || div.innerText || seo_desc;
          }
        }
      }
      let seo_keywords: string = eventData.hashtags;
      let seo_url: string = '';
      if(isPlatformServer(this.platformId)){
          
      }else{
        seo_url = window.location.href;
      }
      let seo_image: string = (ApplicationInteractor.seoUrl + "/assets/images/logo.png");
      if (eventData.photos && eventData.photos.length > 0) {
        if (this.isDev) {
          seo_image = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/" + eventData.photos[0].id + "/thumb";
        } else {
          seo_image = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/" + eventData.photos[0].id + "/thumb";
        }
      }
      this.setTitle(seo_title);
      if (isPlatformServer(this.platformId)) {
        this._meta.addTag({
          'property': 'og:title',
          content: seo_title
        });
        this._meta.addTag({
          'property': 'og:description',
          content: seo_desc
        });
        this._meta.addTag({
          'property': 'og:image',
          content: seo_image
        });
        this._meta.addTag({
          'name': 'twitter:image',
          content: seo_image
        });
        this._meta.addTag({
          'name': 'twitter:description',
          content: seo_desc
        });
        this._meta.addTag({
          'name': 'twitter:title',
          content: seo_title
        });
        this._meta.addTag({
          'name': 'twitter:card',
          content: 'summary_large_image'
        });
        this._meta.addTag({
          'name': 'twitter:site',
          content: '@Hinter_Social'
        });
        this._meta.addTag({
          'name': 'twitter:creator',
          content: '@Hinter_Social'
        });
      } else {
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
        let metaTwitterTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:title', this.document);
        metaTwitterTitle.setAttribute("content", seo_title);
        let metaTwitterDescription: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:description', this.document);
        metaTwitterDescription.setAttribute("content", seo_desc);
        let metaTwitterURL: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:url', this.document);
        metaTwitterURL.setAttribute("content", seo_url);
        let metaTwitterCard: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:card', this.document);
        metaTwitterCard.setAttribute("content", 'summary_large_image');
        let metaTwitterSite: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:site', this.document);
        metaTwitterSite.setAttribute("content", 'Hinter_Social');
        let metaTwitterCreator: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('twitter:creator', this.document);
        metaTwitterCreator.setAttribute("content", 'Hinter_Social');
      }
    }

  }

}
