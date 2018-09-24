

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

  static authToken: string = "5a2929be-f0b6-4474-8839-43729dc39c3d";
  static userEmail: string = "arjunkapoor.nsit@gmail.com";
  static isDev: boolean = true;
  static MOBILE_MAX_WIDTH = 576;  
  static TABLET_MAX_WIDTH = 1024; 

}
