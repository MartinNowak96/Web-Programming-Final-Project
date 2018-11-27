import { GridOptions, GridApi, ColumnApi } from "ag-grid-community";
import { deploy } from "Popups/deploy";
import { error } from "Popups/error";
import { deployments } from "Popups/deployments";
import { addEmployee } from "Popups/addEmployee";
import { inject } from 'aurelia-framework'
import { DialogService } from 'aurelia-dialog';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { global } from 'global'


@inject(DialogService, EventAggregator, Router, global)
export class employeeTable {
    mainEmployeeGridOptions = GridOptions
    gridApi = GridApi
    columnApi = ColumnApi;

    constructor(DialogService, EventAggregator, Router, global) {
        //console.log(this.gridOptions)
        this.ea = EventAggregator;
        this.DialogService = DialogService;
        this.isHalf = false;
        this.router = Router
        this.global = global;
        if (global.isLoggedIn == false) {
            this.router.navigateToRoute('logIn')
        }

        this.mainEmployeeGridOptions = {
            rowData: this.employeeRowData,
            enableSorting: true,
            animateRows: true,
            sortingOrder: ['desc', 'asc', null]
        };

    }


    attached() {
        this.subscription = this.ea.subscribe('pageResize', response => {
            if (this.isHalf == false) {
                this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop - employeeGridButtons.offsetHeight - deployHeader.offsetHeight - deployButtons.offsetHeight - 50) / 2;
                this.deployHeight = this.employeeGridHeight;
            } else {
                this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop - employeeGridButtons.offsetHeight - 50);
                this.deployHeight = this.employeeGridHeight;
            }
        })
        if (this.global.isLoggedIn) {

            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop - employeeGridButtons.offsetHeight - deployHeader.offsetHeight - deployButtons.offsetHeight - 50) / 2;
            this.deployHeight = this.employeeGridHeight;
            this.deployData = [];

            let response = (e) => {

                if (e.currentTarget.readyState == 4 && e.currentTarget.status == 200) {
                    this.employeeRowData = JSON.parse(e.currentTarget.responseText)
                    ///console.log(e.currentTarget.responseText, this.employeeRowData)
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
                                employee.nextDeployDate = deployment.startDate;
                            }


                        })
                        if (employee.deployed != "Yes") {
                            employee.deployed = "No"
                        }

                    });
                    console.log(this.employeeRowData)
                    this.mainEmployeeGridOptions.rowData = this.employeeRowData;

                }
            }
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "https://turing.manhattan.edu/~mnowak01/final/server.php?task=getEmployees", true);
            xmlhttp.onreadystatechange = response
            xmlhttp.send();


            this.deployGridOptions = {
                rowData: this.deployData

            };
        }
    }

    rotateTables() {
        if (this.isHalf == false) {
            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop - employeeGridButtons.offsetHeight - 50);
            this.deployHeight = this.employeeGridHeight;
            employeeWrapper.classList.remove("col")
            employeeWrapper.classList.add("col-6")

            groupWrapper.classList.remove("col")
            groupWrapper.classList.add("col-6")
            tableWrapper.classList.add("row")

            this.isHalf = true;
        } else {
            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop - employeeGridButtons.offsetHeight - deployHeader.offsetHeight - deployButtons.offsetHeight - 60) / 2;
            this.deployHeight = this.employeeGridHeight;
            this.isHalf = false
            employeeWrapper.classList.remove("col-6")
            employeeWrapper.classList.add("col")

            groupWrapper.classList.remove("col-6")
            groupWrapper.classList.add("col")
            tableWrapper.classList.remove("row")

        }
    }

    onReady(e) {

    }


    setUpDeploy() {
        if (this.deployData.length > 0) {
            this.DialogService.open({ viewModel: deploy, model: this.deployData, lock: true }).whenClosed(response => {
                if (!response.wasCancelled) {
                    let employ = "";
                    this.deployData.forEach(employee => {
                        employee.deployments.push(response.output)
                        employ += ","+employee.id;
                    })
                    employ =employ.replace(",", "")
                    console.log(response.output)
                    let response2= (e)=>{
                        if (e.currentTarget.readyState == 4 && e.currentTarget.status == 200) {
                            console.log(e.currentTarget.responseText)
                        }
                    }
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = response2
                   xmlhttp.open("POST", "https://turing.manhattan.edu/~mnowak01/final/server.php?task=addDeployment&lat="+ response.output.long +"&long="+response.output.lat  +"&employ="+employ+"&desc="+response.output.descirption+"&start="+response.output.startDate + "&end=" + response.output.endDate , true);
                    xmlhttp.send();


                } else {

                }
                //console.log(response.output);


            });
        } else {
            this.DialogService.open({ viewModel: error, model: { message: "There needs to be 1 or more employees in the deploy list to setup a deployment." }, lock: true }).whenClosed(response => {

            });
        }

    }

    moveToSelected() {
        let selected = this.mainEmployeeGridOptions.api.getSelectedRows();

        selected.forEach(employee => {
            let isInList = false;
            this.deployData.forEach(employee2 => {
                if (employee.id == employee2.id) {
                    isInList = true
                }
            });
            if (isInList == false) {
                this.deployData.push(employee)
            }
        });

        console.log(this.deployGridOptions)
        this.deployGridOptions.api.setRowData(this.deployData);
    }

    viewDeployment() {
        let selected = this.mainEmployeeGridOptions.api.getSelectedRows();
        if (selected.length != 0) {
            this.DialogService.open({ viewModel: deployments, model: selected[0], lock: true }).whenClosed(response => {

            });
        } else {
            this.DialogService.open({ viewModel: error, model: { message: "Please highlight one employee to view their deployments." }, lock: true }).whenClosed(response => {

            });
        }
    }

    addEmployees() {

        this.DialogService.open({ viewModel: addEmployee, model: this.employeeRowData.length, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
                let xmlhttp = new XMLHttpRequest();
                let response2= (e)=>{
                    if (e.currentTarget.readyState == 4 && e.currentTarget.status == 200) {
                        console.log(e.currentTarget.responseText)
                    }
                }
                console.log(response.output)
                xmlhttp.open("POST", "https://turing.manhattan.edu/~mnowak01/final/server.php?task=addEmployee&id="+response.output.id.toString() +"&f="+response.output.first  +"&l="+response.output.last+"&phone="+response.output.phone+"&add="+response.output.address, true);
                xmlhttp.onreadystatechange = response2
                xmlhttp.send();
                this.employeeRowData.push(response.output)
                this.mainEmployeeGridOptions.api.setRowData(this.employeeRowData)


            } else {

            }
            //console.log(response.output);


        });
    }

    detached() {
        this.subscription.dispose();
    }
}
