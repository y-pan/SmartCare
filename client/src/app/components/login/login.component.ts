import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toDisplayLogin:boolean;
  credential:Credential;
  loginErr:string;
  selectedUserType:Number;

  constructor(
    private configService:ConfigService
    , private dataService:DataService
    , private messageService:MessageService) {
    
    this.messageService.listen().subscribe((msg:any)=>{
      switch(msg){
        // case this.configService.MSG_USER_LOGGEDOUT:
        //   this.display(true);break;
        // case this.configService.MSG_USER_LOGGEDIN:
        //   this.display(false);break;
        case this.configService.MSG_SHOW_LOGIN:
          this.display(true); break;
        // case this.configService.MSG_SHOW_SIGNUP:
        //   this.display(false);break;
        default:
          this.display(false); break;
      }

    })
   }

  ngOnInit() {
 
    this.display(true);
    this.credential = {
      email:"", password:""
    }
    this.loginErr = "";
    this.selectedUserType = 0; /**1-patient,  0 - nurse */
    this.mock_cred();
  }

  display(toDisplay:boolean){
    this.toDisplayLogin = toDisplay;
  }

  mock_cred(){
    this.credential = {
      email:"nurse1@gmail.com"
      , password:"Aa!111"
    }
  }

  onSubmit(){
    let loginUser = this.credential;
    loginUser['usertype'] = this.selectedUserType;
    this.dataService.userLogin(loginUser).subscribe(data => {
        this.loginErr = data["err"];
        if(data["data"]){
            let _user = data["data"]
            this.dataService.setLoginUser(_user);
            this.messageService.filter(this.configService.MSG_USER_LOGGEDIN);
            this.messageService.filter(this.configService.MSG_SHOW_PROFILE);
            
        }
      },err => {
        this.loginErr = err['statusText'] ? err['statusText'] + ": Invalid credentials" : "Invalid credentials";
      })


  }

  chooseUserType(event){
    // console.log("this.selectedUserType: " + this.selectedUserType);
  }

}


interface Credential{
  email:string;
  password:string;
}