import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModuleHttpService } from './services/app-module-http.service';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ApplicationInteractor } from './models/application-interactor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document: Document, private titleService: Title,private route: ActivatedRoute,private appServices:AppModuleHttpService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let id: string = params.get('id');
        let eventType: string = params.get('eventType');
        if(id!=null && eventType!=null){
          this.appServices.getEntryDetailInfo(eventType,id).subscribe((res:any)=>{
            console.log(res);
            if(res && res.body){
              this.createSEOTags(res.body);
            }
          });
        }
      }
      );
  
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  createSEOTags(eventDetail:any): void {
    if(eventDetail &&eventDetail.data && eventDetail.data.length>0){
      let eventData:any = eventDetail.data[0];
      let seo_title: string = eventData.text;
      let seo_desc: string = eventData.text;
      let seo_keywords: string = eventData.hashtags;
      let seo_url: string = ApplicationInteractor.seoUrl;
      let seo_image: string = (ApplicationInteractor.seoUrl + "/assets/images/logo.png");
      if(eventData.photos && eventData.photos.length>0){
        seo_image = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/"+eventData.photos[0].id;
      }
      this.setTitle(seo_title);
      let linkCanonical:HTMLElement = ApplicationInteractor.getOrCreateLinkElement('canonical',this.document,seo_url);
      linkCanonical.setAttribute("href",seo_url);
      let metaKeywords: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('keywords', this.document)
      metaKeywords.setAttribute("content", seo_keywords);
      let metaRobot: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('robots', this.document)
      metaRobot.setAttribute("content", "noimageindex");
      let metaGoogleBot: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('googlebot', this.document)
      metaGoogleBot.setAttribute("content", "noimageindex");
      let metaOGTitle: HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:title', this.document, 'property');
      metaOGTitle.setAttribute("content", seo_title);
      let metaOGHeadline:HTMLElement = ApplicationInteractor.getOrCreateMetaElement('og:headline',this.document,'itemprop');
      metaOGHeadline.setAttribute("content",seo_title);
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
