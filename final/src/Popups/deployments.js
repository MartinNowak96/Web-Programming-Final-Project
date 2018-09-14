import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)

export class deploy {

    constructor(DialogController) {
        this.DialogController = DialogController;
        const controlUrl = '//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded';
        this.ready = new Promise(resolve => window['bingMapsLoaded'] = resolve);

        this.scriptTag = document.createElement('script');
        this.scriptTag.async = true;
        this.scriptTag.defer = true;
        this.scriptTag.src = controlUrl;
    }

    attached() {
        mapWrapper.appendChild(this.scriptTag)
        this.ready.then(() => {
            this.map = new Microsoft.Maps.Map(mapWrapper, {
              credentials: 'At2-XQeVvD3BK82klFryRbBFXgVMv8T1fgOsMIV3CyRHOFRn_OXuVAoNNm_abD7C'
            });
        });
    }

    submit(){
        let start = startDate.Value;
        console.log(start);
        let end = endDate.Value;
        console.log(this.startDate);
        console.log(endDate)

    }

    closePopUp(){
        this.DialogController.close()
    }


}