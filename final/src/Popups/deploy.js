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

            this.location = this.map.getCenter();

            this.viewChangeHandler = Microsoft.Maps.Events.addHandler(this.map, 'viewchange', e => {
                this.location = this.map.getCenter();
            });

            this.mapClick = Microsoft.Maps.Events.addHandler(this.map, 'mousedown', e => {
                console.log(e)
                this.map.entities.clear();
                var pushpinOptions = { };
                var pushpin = new Microsoft.Maps.Pushpin(e.location, pushpinOptions);
                this.map.entities.push(pushpin);
                this.location = [e.location.longitude,e.location.latitude]
            });

        });
    }

    activate(model) {
        this.model = model
    }

    submit() {
        let start = startDate.value.toString().replace("-","/").replace("-","/");
        start =  start.substring(5,7) +"/"+ start.substring(8,10) +"/"+start.substring(0,4);
        console.log(start);
        let end = endDate.value.toString().replace("-","/").replace("-","/");
        end =  end.substring(5,7) +"/"+ end.substring(8,10) +"/"+end.substring(0,4);
        console.log(end)
        console.log(this.location)
        let deploy = {location:this.location, descirption:description.value, startDate: start, endDate:end}
        this.DialogController.close(deploy)

    }

    closePopUp() {
        this.DialogController.close()
    }


}