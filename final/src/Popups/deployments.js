import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)

export class deployments {

    constructor(DialogController) {
        this.DialogController = DialogController;
        
        

    }

    activate(model){
        this.selectedEmployee= model;
        console.log(this.selectedEmployee)
        this.deploymentGridOptions = {
            rowData: this.selectedEmployee.deployments,
            enableSorting: true,
            animateRows: true,
            sortingOrder: ['desc', 'asc', null],
            rowSelection: 'multiple',
            rowHeight: "40",

        };
    }
    attached() {
       
    }

    submit(){
        let start = new Date(startDate.value);
        
        let end = endDate.value;
        
        console.log(endDate.value)

    }

    closePopUp(){
        this.DialogController.close()
    }

    

}