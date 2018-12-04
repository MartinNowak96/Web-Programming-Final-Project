import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework'
@inject(EventAggregator)
export class employeeMap {
  constructor(EventAggregator) {
    this.ea = EventAggregator;
    const controlUrl = '//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded';
    this.ready = new Promise(resolve => window['bingMapsLoaded'] = resolve);

    this.scriptTag = document.createElement('script');
    this.scriptTag.async = true;
    this.scriptTag.defer = true;
    this.scriptTag.src = controlUrl;
    this.employeeGroups = []
    this.showHover = false;
  }

  attached() {
    this.subscription = this.ea.subscribe('pageResize', response => {
      this.height = window.innerHeight - 100;
    })
    mapWrapper.appendChild(this.scriptTag)
    this.ready.then(() => {
      this.map = new Microsoft.Maps.Map(mapWrapper, {
        credentials: 'At2-XQeVvD3BK82klFryRbBFXgVMv8T1fgOsMIV3CyRHOFRn_OXuVAoNNm_abD7C'

      });



      this.viewChangeHandler = Microsoft.Maps.Events.addHandler(this.map, 'viewchange', e => {
        this.location = this.map.getCenter();



      });
      let response = (e) => {

        if (e.currentTarget.readyState == 4 && e.currentTarget.status == 200) {
          this.deployments = JSON.parse(e.currentTarget.responseText)
          this.addPinsToMap()
          this.fullDeployments = this.deployments;

          let response = (e) => {

            if (e.currentTarget.readyState == 4 && e.currentTarget.status == 200) {
              this.employeeRowData = JSON.parse(e.currentTarget.responseText)
              this.employeeRowData.forEach(employee => {

                let year = (new Date()).getFullYear().toString()
                let month = (parseFloat((new Date()).getMonth()) + 1).toString();
                let day = (new Date()).getDate();
                if (parseFloat(month) <= 9) {
                  month = "0" + month;
                }
                if (parseFloat(day) <= 9) {
                  day = "0" + day;
                }
                let today = year + month + day;
                employee.deployments.forEach(deployment => {
                  let start = deployment.startDate.substring(6, 10) + deployment.startDate.substring(0, 2) + deployment.startDate.substring(3, 5);
                  let end = deployment.endDate.substring(6, 10) + deployment.endDate.substring(0, 2) + deployment.endDate.substring(3, 5);
                  if (start <= today && end >= today) {
                    employee.deployed = "Yes";

                  } else if (start > today && employee.nextDeployDate == "") {
                    employee.deployed = "No"
                    employee.nextDeployDate = deployment.startDate;
                  }


                })
              });

              this.getEmployeeGroups()

            }
          }
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("POST", "https://turing.manhattan.edu/~mnowak01/final/server.php?task=getEmployees", true);
          xmlhttp.onreadystatechange = response
          xmlhttp.send();

        }
      }
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "https://turing.manhattan.edu/~mnowak01/final/server.php?task=getDeployments", true);
      xmlhttp.onreadystatechange = response
      xmlhttp.send();




    });
  }


  dateChange() {
    let date = dateSelect.value.toString().replace("-", "/").replace("-", "/");
    date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
    this.deployments = []
    this.fullDeployments.forEach(deployment => {
      let start = deployment.startDate.substring(6, 10) + deployment.startDate.substring(0, 2) + deployment.startDate.substring(3, 5);
      let end = deployment.endDate.substring(6, 10) + deployment.endDate.substring(0, 2) + deployment.endDate.substring(3, 5);
      if (start <= date && end >= date) {
        this.deployments.push(deployment)
      }
    })
    let pins = this.map.entities.getPrimitives();
    for(let i = 0; i < pins.length+1; i ++){
      this.map.entities.pop()
      this.map.entities.pop()
      this.map.entities.pop()
    }
    for(let i = 0; i < pins.length+1; i ++){
      this.map.entities.pop()
    }
    
    this.addPinsToMap()
    this.employeeGroups =[]
    this.getEmployeeGroups()

  }

  addPinsToMap() {
    let count = 0;
    this.deployments.forEach(deploy => {
      var location = new Microsoft.Maps.Location(deploy.long, deploy.lat)
      var pushpin = new Microsoft.Maps.Pushpin(location);
      pushpin.metadata = { index: count }
      count += 1;
      this.map.entities.push(pushpin)
      Microsoft.Maps.Events.addHandler(pushpin, "mouseover", e => {
        let pixel = this.map.tryLocationToPixel(pushpin.getLocation(), Microsoft.Maps.PixelReference.control);
        this.hoverEmployees = this.employeeGroups[pushpin.metadata.index].employees
        this.description = deploy.description
        this.dateRange = deploy.startDate + " - " + deploy.endDate;
        this.popupX = pixel.x + 10;
        this.popupY = pixel.y - 10
        this.showHover = true;
      })
      Microsoft.Maps.Events.addHandler(pushpin, "mouseout", e => {
        this.showHover = false;
      })
    })
  }

  getEmployeeGroups() {
    let count = 0
    this.deployments.forEach(deploy => {
      count += 1;
      let group = { groupID: count, employees: [] }
      deploy.employees.forEach(deployEmployee => {
        this.employeeRowData.forEach(employee2 => {
          if (deployEmployee == employee2.id) {
            group.employees.push({ name: employee2.name })
          }
        })
      })
      this.employeeGroups.push(group)
    })
  }

  detached() {
    this.subscription.dispose()
  }

}
