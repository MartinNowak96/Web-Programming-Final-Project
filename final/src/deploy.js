import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)

export class deploy {

    constructor() {

        const controlUrl = '//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded';
        const ready = new Promise(resolve => window['bingMapsLoaded'] = resolve);

        let scriptTag = document.createElement('script');
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.src = controlUrl;
    }

    attached() {
        ready.then(() => {
            this.map = new Microsoft.Maps.Map(this.container as HTMLElement, {
              credentials: this.apiKey
            });
    }

}