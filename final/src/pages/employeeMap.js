export class employeeMap{
    constructor(DialogController) {
        this.DialogController = DialogController;
        const controlUrl = '//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded';
        this.ready = new Promise(resolve => window['bingMapsLoaded'] = resolve);

        this.scriptTag = document.createElement('script');
        this.scriptTag.async = true;
        this.scriptTag.defer = true;
        this.scriptTag.src = controlUrl;


        this.employeeGroups =[ { groupID: 1, employees:[{name:"Martin Nowak"}, {name:"John Doe"}] },
        { groupID: 2, employees:[{name:"Martin Nowak"}, {name:"John Doe"}] } ]
    }

    attached() {
        mapWrapper.appendChild(this.scriptTag)
        this.ready.then(() => {
            this.map = new Microsoft.Maps.Map(mapWrapper, {
              credentials: 'At2-XQeVvD3BK82klFryRbBFXgVMv8T1fgOsMIV3CyRHOFRn_OXuVAoNNm_abD7C'
            });
        });
    }
}