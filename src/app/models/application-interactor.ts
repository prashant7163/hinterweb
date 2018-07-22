

export class ApplicationInteractor {
  static toInstance<T>(obj: T, jsonObj: Object): T {
    // var jsonObj = JSON.parse(json);

    if (typeof obj["fromJSON"] === "function") {
      obj["fromJSON"](jsonObj);
    }
    else {
      for (var propName in jsonObj) {
        obj[propName] = jsonObj[propName]
      }
    }

    return obj;
  }

  

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

  static url: string = "https://hinter.sg";
  static seoUrl: string = "https://hinter.sg";
  
}
