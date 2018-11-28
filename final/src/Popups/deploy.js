import { inject } from 'aurelia-framework';
import { error } from "Popups/error";
import { DialogController } from 'aurelia-dialog';
import { DialogService } from 'aurelia-dialog';

@inject(DialogController, DialogService)

export class deploy {

    constructor(DialogController, DialogService) {
        this.DialogController = DialogController;
        this.DialogService = DialogService;
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
                this.map.entities.clear();
                var pushpinOptions = {};
                var pushpin = new Microsoft.Maps.Pushpin(e.location, pushpinOptions);
                this.map.entities.push(pushpin);
                this.deployLocation = {long: e.location.longitude, lat: e.location.latitude}
            });

        });
    }

    activate(model) {
        this.model = model
    }

    submit() {

        if(this.deployLocation == undefined || this.deployLocation == null ){
            this.DialogService.open({ viewModel: error, model: { message: "Please use the map to select a deployment location." }, lock: true }).whenClosed(response => {

            });
        }
        else if (startDate.value == "") {
            this.DialogService.open({ viewModel: error, model: { message: "Please select a start date." }, lock: true }).whenClosed(response => {

            });
        } else if (startDate.value == "") {
            this.DialogService.open({ viewModel: error, model: { message: "Please select an end date." }, lock: true }).whenClosed(response => {

            });
        }
        else if (startDate.value.toString().replace("-","").replace("-","") > endDate.value.toString().replace("-","").replace("-","") ) {
            this.DialogService.open({ viewModel: error, model: { message: "Starting Date must be before the ending date." }, lock: true }).whenClosed(response => {

            });

        } else {

            let start = startDate.value.toString().replace("-", "/").replace("-", "/");
            start = start.substring(5, 7) + "/" + start.substring(8, 10) + "/" + start.substring(0, 4);
            let end = endDate.value.toString().replace("-", "/").replace("-", "/");
            end = end.substring(5, 7) + "/" + end.substring(8, 10) + "/" + end.substring(0, 4);
            let deploy = { long: this.deployLocation.long,lat:this.deployLocation.lat, descirption: description.value, startDate: start, endDate: end }
            this.DialogController.ok(deploy)
        }

    }

    closePopUp() {
        this.DialogController.close()
    }


}
