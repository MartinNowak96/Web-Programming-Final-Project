import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';  

@inject(DialogController)
export class error {
    constructor(DialogController) {
        this.DialogController = DialogController;
        
        

    }

    activate(model){
        this.model = model
    }
    attached() {
       
    }

    

    closePopUp(){
        this.DialogController.close()
    }

    

}