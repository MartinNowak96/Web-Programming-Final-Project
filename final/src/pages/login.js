
import {Router} from 'aurelia-router';
import { inject } from 'aurelia-framework';
import {global} from 'global'
@inject(Router,global)
export class login{
  constructor(router, global){
    this.router = router
    this.global = global
    this.error=""
  }
    login(){
      let response = (e)=>{
          
        if (e.currentTarget.readyState==4 && e.currentTarget.status==200) {
          console.log(e.currentTarget.responseText)
          if(e.currentTarget.responseText == "true"){
            this.global.isLoggedIn = true
            this.router.navigateToRoute("employeesTables")
          }else{
            this.error ="Login Failed"
          }
        
        }
        
        };
      let xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","https://turing.manhattan.edu/~mnowak01/final/server.php?task=login&user="+user.value +"&pass="+pass.value,true);
      xmlhttp.onreadystatechange=response
      xmlhttp.send();
    }
}
