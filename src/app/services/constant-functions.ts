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
}



