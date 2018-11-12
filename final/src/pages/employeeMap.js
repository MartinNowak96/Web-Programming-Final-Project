export class employeeMap {
  constructor(DialogController) {
    this.DialogController = DialogController;
    const controlUrl = '//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded';
    this.ready = new Promise(resolve => window['bingMapsLoaded'] = resolve);

    this.scriptTag = document.createElement('script');
    this.scriptTag.async = true;
    this.scriptTag.defer = true;
    this.scriptTag.src = controlUrl;


    this.employeeGroups = [{ groupID: 1, employees: [{ name: "Martin Nowak" }, { name: "John Doe" }], longitude: 40.7, latitude: -74 },
    { groupID: 2, employees: [{ name: "Martin Nowak" }, { name: "John Doe" }], longitude: 40.71, latitude: -74.1 },
    { groupID: 3, employees: [{ name: "Martin Nowak" }, { name: "John Doe" }], longitude: 40.9, latitude: -74.3 }]
  }

  attached() {
    mapWrapper.appendChild(this.scriptTag)
    this.ready.then(() => {
      this.map = new Microsoft.Maps.Map(mapWrapper, {
        credentials: 'At2-XQeVvD3BK82klFryRbBFXgVMv8T1fgOsMIV3CyRHOFRn_OXuVAoNNm_abD7C'

      });

      this.employeeGroups.forEach(group => {
        var location = new Microsoft.Maps.Location(group.longitude, group.latitude)
        var pushpin = new Microsoft.Maps.Pushpin(location);
        this.map.entities.push(pushpin)

        this.viewChangeHandler = Microsoft.Maps.Events.addHandler(this.map, 'viewchange', e => {
          this.location = this.map.getCenter();


        })
      });
      let response = (e)=>{
          
        if (e.currentTarget.readyState==4 && e.currentTarget.status==200) {
          this.deployments = JSON.parse(e.currentTarget.responseText)
          
         
        console.log(this.employeeRowData)

        }
      }
      let xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","https://turing.manhattan.edu/~mnowak01/final/server.php?task=getDeployments",true);
      xmlhttp.onreadystatechange=response
      xmlhttp.send();



    });
  }
}
