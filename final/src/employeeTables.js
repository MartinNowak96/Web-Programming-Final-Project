import { GridOptions, GridApi, ColumnApi } from "ag-grid-community";
import {deploy} from "deploy";
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

        this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight- deployHeader.offsetHeight - deployButtons.offsetHeight-20)/2;
        this.deployHeight = this.employeeGridHeight;
        this.deployData = [];
        this.subscription = this.ea.subscribe('pageResize', response =>{
            if(this.isHalf == false){
                this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight- deployHeader.offsetHeight - deployButtons.offsetHeight-20)/2;
                this.deployHeight = this.employeeGridHeight;
            }else{
                this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight-10);
                this.deployHeight = this.employeeGridHeight;
            }
        })

        this.employeeRowData = [{ id: '1' , name: "Martin Nowak", phone: "555-555-5555", address: "180 Smith Street, Middletown NY, 10940", deployed:"Yes" },
        { id: '2' , name: "John Doe", phone: "555-555-5555", address: "180 Smith Street, Middletown NY, 10940", deployed:"Yes" }]


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
            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight-10);
                this.deployHeight = this.employeeGridHeight;
            employeeWrapper.classList.remove("col")
            employeeWrapper.classList.add("col-6")

            groupWrapper.classList.remove("col")
            groupWrapper.classList.add("col-6")
            tableWrapper.classList.add("row")
            
            this.isHalf = true;
        } else {
            this.employeeGridHeight = (window.innerHeight - employeeGrid.offsetTop -employeeGridButtons.offsetHeight- deployHeader.offsetHeight - deployButtons.offsetHeight-20)/2;
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
        this.DialogService.open({ viewModel: deploy, model:{}, lock: true }).whenClosed(response => {
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
    
}