import { GridOptions, GridApi, ColumnApi } from "ag-grid-community";
import { inject } from 'aurelia-framework'

export class employeeTable {
    mainEmployeeGridOptions = GridOptions
    gridApi = GridApi
    columnApi = ColumnApi;

    constructor() {
        //console.log(this.gridOptions)

        this.isHalf = false;
        this.employeeRowData = [{ name: "Martin Nowak", phone: "555-555-5555", address: "180 Smith Street, Middletown NY, 10940", deployed:"Yes" }]


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

    rotateTables() {
        if (this.isHalf == false) {
            employeeWrapper.classList.remove("col")
            employeeWrapper.classList.add("col-6")

            groupWrapper.classList.remove("col")
            groupWrapper.classList.add("col-6")
            tableWrapper.classList.add("row")
            this.isHalf = true;
        } else {
            this.isHalf = false
            employeeWrapper.classList.remove("col-6")
            employeeWrapper.classList.add("col")

            groupWrapper.classList.remove("col-6")
            groupWrapper.classList.add("col")
            tableWrapper.classList.remove("row")
        }
    }

    onReady(e) {
        console.log("hi")
        console.log(e)
        console.log(this.mainEmployeeGridOptions)
    }
}