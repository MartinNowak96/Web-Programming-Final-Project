import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';  

@inject(DialogController)

export class addEmployee {
    constructor(DialogController) {
        this.DialogController = DialogController;
        
        

    }

    activate(model){
        this.model = model
    }
    attached() {
       
    }

    submit(){
        let employee = {id: this.model+1,name: first.value +" "+last.value, phone:phone.value, address:address.value + city.value + state.value + zip.value, deployed:"No"};
        this.DialogController.ok(employee)
    }

    closePopUp(){
        this.DialogController.close()
    }

    

}