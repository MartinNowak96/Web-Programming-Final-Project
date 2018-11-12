import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class App {
  constructor(EventAggregator) {
    this.ea = EventAggregator
    this.message = 'Hello World!';
  }

  hamMenuClck() {
    if (hambergerMenu.style.animationPlayState != "running") {
      hambergerMenu.style.animationPlayState = "running"
      hambergerMenu.classList.remove("moveDivLeft");
      hambergerMenu.classList.remove("moveDivRight");

      if (hambergerMenu.style.width == "80px") {
        hambergerMenu.classList.add("moveDivRight");
        hambergerMenu.style.width = "300px";
      } else {
        hambergerMenu.classList.add("moveDivLeft");
        hambergerMenu.style.width = "80px";
      }



      setTimeout(() => {
        hambergerMenu.style.animationPlayState = "paused";
      }, 610)//this time must match up with the time on the html +10
    }

  }

  goToLogIn() {
    this.router.navigateToRoute("logIn")
  }


  goToTables() {
    this.router.navigateToRoute("employeesTables")
  }


  goToMap() {
    this.router.navigateToRoute("employeeMap")
  }


  pageResize(e) {
    this.ea.publish('pageResize');
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'App Name';
    config.map([
      { route: ['', 'login'], name: 'logIn', moduleId: 'pages/login', title: 'Log In' },
      { route: ['employeeTable'], name: 'employeesTables', moduleId: 'pages/employeeTables', title: 'Tables' },
      { route: ['employeeMap'], name: 'employeeMap', moduleId: 'pages/employeeMap', title: 'Map' }
    ]);
  }





}
