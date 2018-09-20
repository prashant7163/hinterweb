import { Subject } from "rxjs";

export class MessageService {

    private loaderMessage = new Subject<Boolean>();

    loaderMessage$ = this.loaderMessage.asObservable();

    sendLoaderMessage(message: boolean) {
        this.loaderMessage.next(message);
    }

}