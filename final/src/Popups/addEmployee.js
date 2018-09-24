import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';  

@inject(DialogController)

export class deployments {
    constructor(DialogController) {
        this.DialogController = DialogController;
        
        

    }

    activate(model){
        
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