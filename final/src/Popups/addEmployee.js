import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';  

@inject(DialogController)
export class addEmployee {
    constructor(DialogController) {
        this.DialogController = DialogController;
        
        

    }

    activate(model){
        this.model = model
        if(this.model.type == "edit"){
        this.employee =this.model.employee
        
        
        }
    }
    attached() {
      if(this.model.type == "edit"){
        address.value= this.employee.address
        first.value = this.employee.first;
        last.value = this.employee.last
        phone.value = this.employee.phone
        
        
        }
      
    }

    submit(){
      let employee
      if(this.model.type == "add"){
        employee = {id: this.model.id+1,first:first.value, last:last.value,name: first.value +" "+last.value, phone:phone.value, address:address.value, deployed:"No"};
      }
      else{
        employee = {id: this.model.id+1,first:first.value, last:last.value,name: first.value +" "+last.value, phone:phone.value, address:address.value, deployed:"No"};

      }
        this.DialogController.ok(employee)
    }

    closePopUp(){
        this.DialogController.close()
    }

    

}
