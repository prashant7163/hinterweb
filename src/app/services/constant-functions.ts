import { ApplicationInteractor } from "../models/application-interactor";
import { Constants } from "../models/constants";

export class ConstantFunctions {
    /**
      * get the HTML Element when it is in the markup, or create it.
      * @param name
      * @returns {HTMLElement}
      */
    static getOrCreateMetaElement(name: string, document: Document, propertyName: string = 'name'): HTMLElement {
        let el: HTMLElement;
        if (propertyName == 'name') {
            el = (document.querySelector(`meta[name='${name}']`) as HTMLElement);
        } else if (propertyName == 'property') {
            el = (document.querySelector(`meta[property='${name}']`) as HTMLElement);
        }
        else if (propertyName == 'itemprop') {
            el = (document.querySelector(`meta[itemprop='${name}']`) as HTMLElement);
        }
        if (el === null) {
            el = document.createElement('meta');
            if (propertyName == 'name') {
                el.setAttribute('name', name);
            }
            else if (propertyName == 'property') {
                el.setAttribute('property', name);
            } else if (propertyName == 'itemprop') {
                el.setAttribute('itemprop', name);
            }
            document.head.appendChild(el);
        }
        return el;
    }

    /**
    * get the HTML Element when it is in the markup, or create it.
    * @param name
    * @returns {HTMLElement}
    */
    static getOrCreateLinkElement(name: string, document: Document, url: string): HTMLElement {
        let el: HTMLElement = null;
        // el = this.document.querySelector(`link[rel='${name}']`);
        if (el === null) {
            el = document.createElement('link');
            el.setAttribute('rel', name);
            el.setAttribute('href', url);
            document.head.appendChild(el);
        }
        return el;
    }
    static getMainImageUrl(imageId: string): string {
        let baseUrl: string = Constants.baseImageUrl_prod;
        if (ApplicationInteractor.isDev) {
            baseUrl = Constants.baseImageUrl_dev;
        }
        return baseUrl + "entry/" + imageId + "/" + 0;
    }

    static getProfileThumbnailImageUrl(userId: string, dpTime: number) {
        let baseUrl: string = Constants.baseImageUrl_prod;
        if (ApplicationInteractor.isDev) {
            baseUrl = Constants.baseImageUrl_dev;
        }
        return baseUrl + "user/" + userId + "/" + dpTime;
    }

    static getTimeInDifference(diffTime: number): string {
        let cd: number = 24 * 60 * 60 * 1000;
        let ch: number = 60 * 60 * 1000;
        let d: number = Math.floor(diffTime / cd);
        let h: number = Math.floor((diffTime - d * cd) / ch);
        let m: number = Math.round((diffTime - d * cd - h * ch) / 60000);

        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        return [d, this.pad(h), this.pad(m)].join(' ');
    }

    static pad(n) { return n < 10 ? '0' + n : n; };

    static getMonthStr(mon: number): string {
        switch (mon) {
            case 0:
                return 'january';
            case 1:
                return 'Febuary';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'Septempber';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
        }
        return '';
    }

    static getRandomBackground(pos: number): string {
        //        int random = (int) (Math .random()*6);
        let random: number = pos % 6;
        switch (random) {
            case 0:
                return '/assets/images/background/event_background1.png';
            case 1:
                return '/assets/images/background/event_background2.png';
            case 2:
                return '/assets/images/background/event_background3.png';
            case 3:
                return '/assets/images/background/event_background4.png';
            case 4:
                return '/assets/images/background/event_background5.png';;
            case 5:
                return '/assets/images/background/event_background6.png';
        }
        return '/assets/images/background/event_background1.png';
    }

    static isOnmobileDevice():boolean{
        if(window.innerWidth<=ApplicationInteractor.MOBILE_MAX_WIDTH){
            return true;
        }
        return false;
    }

    static hexEncode(str: string) {
        var hex, i;
        console.log("hx:"+str);
        var result = "";
        for (i = 0; i < str.length; i++) {
          hex = str.charCodeAt(i).toString(16);
          result += ("000" + hex).slice(-4);
        }
        console.log("hxr:"+str);
        return result;
      }
    
      static hexDecode(str: string) {
        var j;
        var hexes = str.match(/.{1,4}/g) || [];
        var back = "";
        for (j = 0; j < hexes.length; j++) {
          back += String.fromCharCode(parseInt(hexes[j], 16));
        }
    
        return back;
      }
    
      static convertUniCodeToStr(str: string): string {
        console.log(str);
        while (str.indexOf("\\u") != -1) {
          let uIndex: number = str.indexOf("\\u");
          let sIndex: number = str.indexOf(" ", uIndex);
          if (sIndex == -1) {
            sIndex = str.length;
          }
          let temp: string = str.substring(uIndex, sIndex).trim();
          console.log(temp.trim());
          console.log(this.hexDecode(this.hexEncode("\uD83D\uDE42")));
          console.log(this.hexDecode(this.hexEncode(temp)));
          str.replace(str.substring(uIndex, sIndex), this.hexDecode(this.hexEncode(str.substring(uIndex, sIndex))));
          console.log(str);
          break;
        }
        return str;
      }
}



