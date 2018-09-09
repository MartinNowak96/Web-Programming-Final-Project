import {GridOptions, GridApi, ColumnApi} from "ag-grid-community";
import {inject} from 'aurelia-framework'

export class employeeTable{
    mainEmployeeGridOptions = GridOptions
    gridApi = GridApi
    columnApi = ColumnApi;

    constructor(){
        //console.log(this.gridOptions)
        this.employeeRowData =[{ name:"Martin Nowak", phone:"555-555-5555", address:"180 Smith Street, Middletown NY, 10940" }]

        this.mainEmployeeGridOptions = {
            rowData: this.employeeRowData,
            enableSorting: true,
            animateRows: true,
            sortingOrder: ['desc', 'asc', null],
            rowSelection: 'multiple',
            rowHeight: "40",

        };

    }

    attached() {
        
        
    }

    onReady(e){
        console.log("hi")
        console.log(e)
        console.log(this.mainEmployeeGridOptions)
    }
}