import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)

export class deploy{

    constructor(){

        const controlUrl = '//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded';
        const ready = new Promise(resolve => window['bingMapsLoaded'] = resolve);

        let script = document.createElement('script');

    }

    attached(){

    }

}