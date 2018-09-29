import { GridOptions, GridApi, ColumnApi } from "ag-grid-community";
import {deploy} from "Popups/deploy";
import {deployments} from "Popups/deployments";
import {addEmployee} from "Popups/addEmployee";
import { inject } from 'aurelia-framework'
import {DialogService} from 'aurelia-dialog';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(DialogService, EventAggregator)
export class employeeTable {
    mainEmployeeGridOptions = GridOptions
    gridApi = GridApi
    columnApi = ColumnApi;

    constructor(DialogService,EventAggregator) {
        //console.log(this.gridOptions)
        this.ea = EventAggregator;
        this.DialogService = DialogService;
        this.isHalf = false;
        

    }
        

    attached() {

        this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight- deployHeader.offsetHeight - deployButtons.offsetHeight-50)/2;
        this.deployHeight = this.employeeGridHeight;
        this.deployData = [];
        this.subscription = this.ea.subscribe('pageResize', response =>{
            if(this.isHalf == false){
                this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight- deployHeader.offsetHeight - deployButtons.offsetHeight-50)/2;
                this.deployHeight = this.employeeGridHeight;
            }else{
                this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight-50);
                this.deployHeight = this.employeeGridHeight;
            }
        })

        this.employeeRowData = [{ id: '1' , name: "Martin Nowak", phone: "555-555-5555", address: "180 Smith Street, Middletown NY, 10940", deployed:"", nextDeployDate: "", 
        deployments:[{startDate: "08/02/2018", endDate: "08/03/2018"},{startDate: "08/20/2018", endDate: "08/22/2018"}, {startDate: "9/20/2018", endDate: "10/22/2018", description:"Remove virus"} ] },

        { id: '2' , name: "John Doe", phone: "555-555-5555", address: "180 Smith Street, Middletown NY, 10940", deployed:"", nextDeployDate: "", 
        deployments:[{startDate: "08/15/2018", endDate: "08/18/2018", description:"Fix computer"},{startDate: "8/20/2018", endDate: "8/22/2018", description:"Remove virus"},{startDate: "12/20/2018", endDate: "12/22/2018", description:"Remove virus"},
     ]  }]

        this.employeeRowData.forEach(employee => {
            
            let year = (new Date()).getFullYear().toString()
            let month = (parseFloat((new Date()).getMonth())+1).toString();
            let day = (new Date()).getDate();
            if(parseFloat(month) <= 9){
                month = "0"+month;
            }
            if(parseFloat(day) <= 9){
                day = "0"+day;
            }
            let today = year + month +day;
            employee.deployments.forEach(deployment =>{
                let start = deployment.startDate.substring(6,10) + deployment.startDate.substring(0,2) + deployment.startDate.substring(3,5);
                let end = deployment.endDate.substring(6,10) + deployment.endDate.substring(0,2) + deployment.endDate.substring(3,5);
                if(start <= today && end >= today){
                    employee.deployed="Yes";
                    
                }else if(start > today && employee.nextDeployDate == ""){
                    employee.nextDeployDate = deployment.startDate;
                }
                

            })
            if(employee.deployed != "Yes"){
                employee.deployed = "No"
            }
        });


        this.mainEmployeeGridOptions = {
            rowData: this.employeeRowData,
            enableSorting: true,
            animateRows: true,
            sortingOrder: ['desc', 'asc', null],
            rowSelection: 'multiple',
            rowHeight: "40",

        };

        this.deployGridOptions = {
            rowData: this.deployData,
            enableSorting: true,
            animateRows: true,
            sortingOrder: ['desc', 'asc', null],
            rowSelection: 'multiple',
            rowHeight: "40",

        };

    }

    rotateTables() {
        if (this.isHalf == false) {
            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight-50);
                this.deployHeight = this.employeeGridHeight;
            employeeWrapper.classList.remove("col")
            employeeWrapper.classList.add("col-6")

            groupWrapper.classList.remove("col")
            groupWrapper.classList.add("col-6")
            tableWrapper.classList.add("row")
            
            this.isHalf = true;
        } else {
            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight- deployHeader.offsetHeight - deployButtons.offsetHeight-60)/2;
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


    setUpDeploy(){
        this.DialogService.open({ viewModel: deploy, model:this.deployData, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
              
              
            } else {
             
            }
            //console.log(response.output);
            
            
          });
        
    }

    moveToSelected(){
       let selected = this.mainEmployeeGridOptions.api.getSelectedRows();
        
       selected.forEach(employee => {
           let isInList =false;
        this.deployData.forEach(employee2 =>{
               if(employee.id == employee2.id){
                   isInList =true
               }
           });
           if(isInList ==false){
               this.deployData.push(employee)
           }
       });
       
    console.log(this.deployGridOptions)
       this.deployGridOptions.api.setRowData(this.deployData);
    }
 
    viewDeployment(){
        let selected = this.mainEmployeeGridOptions.api.getSelectedRows();
        this.DialogService.open({ viewModel: deployments, model:selected[0], lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
              
              
            } else {
             
            }
            //console.log(response.output);
            
            
          });
    }
    
    addEmployees(){
        
              
              
        this.DialogService.open({ viewModel: addEmployee, model:this.employeeRowData.count, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
           
              this.employeeRowData.push(response.output)
              this.mainEmployeeGridOptions.api.setRowData(this.employeeRowData)
            
              
            } else {
             
            }
            //console.log(response.output);
            
            
          });
    }
}