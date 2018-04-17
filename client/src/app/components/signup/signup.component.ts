import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // rForm: FormGroup;
  toDisplaySignUp:boolean;
  user: User;
  signUpErrs:any;
  selectedUserType:Number;

  isSubmitDisabled:boolean; /** to disable submit button when 2 passwords don't match */

  constructor(
    private dataService:DataService
    , private fb:FormBuilder
    , private messageService: MessageService
    , private configService: ConfigService
  ) {
    // this.rForm = fb.group({
    //   'studentnumber':[null, Validators.required],
    //   'password':[null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(18)])],
    //   'firstname':[null, Validators.required],
    //   'lastname':[null, Validators.required],
    //   'email':[null, Validators.compose([Validators.required, Validators.email])],
    //   'address':[null],
    //   'city':[null],
    //   'phone':[null],
    // })

    this.messageService.listen().subscribe((msg:any) =>{
      switch(msg){
        case this.configService.MSG_SHOW_SIGNUP:
          this.display(true);break;
        default:
          this.display(false);break;
      }
    });
    
   }

  ngOnInit() {
    // this.display(false);
    this.selectedUserType = 0; /** 0-nurse, 1-patient */
    this.isSubmitDisabled = true;
    this.signUpErrs = [];
    this.user = {
      password:"",
      passwordAgain:"",
      firstname:"",
      lastname:"",
      email:"",
      healthcard:"",
      phone:"",
      responder:""
    }

    this.mock_user();
  }
  display(toDisplay:boolean){
    this.toDisplaySignUp = toDisplay;
  }

  
  match2Passwords() {
    if(this.user.password == "" ||this.user.passwordAgain == "" ||  this.user.password !=  this.user.passwordAgain){
      this.isSubmitDisabled = true;
    }else{     
      this.isSubmitDisabled = false;
    }
  }

  mock_user(){
    this.user = {
      password:"Aa!111",
      passwordAgain:"Aa!111",
      firstname:"firstname_m1",
      lastname:"lastname_m1",
      email:"email_m1@gmail.com",
      healthcard: "100200401",
      phone:"6470000001",
      responder:"panyunkui2@gmail.com"
    }
  }

  chooseUserType(event){
    // console.log("type: " + this.selectedUserType);
  }
  onSubmit(){
    this.signUpErrs = [];

    if(this.user.password != this.user.passwordAgain){
      this.signUpErrs = ["Passwords didn't match!"];
      return;
    }

    this.dataService.userSignup(this.user).subscribe(data =>{

      if(data.err){
        let dbErr = data["err"];
        if(dbErr["errmsg"]){
          this.signUpErrs.push(dbErr["errmsg"]);
        }else{
          if(dbErr instanceof Object){
            // 
          }else{
            this.signUpErrs.push(dbErr)
          }
        }
      
        let errors = data["err"]["errors"]; /** validation errors */
        for(var prop in errors){
          if(errors.hasOwnProperty(prop)){
            this.signUpErrs.push(errors[prop]["message"]);
          }
        }
      }else{
        let _user = data.data;
        this.dataService.setLoginUser(_user);
        this.messageService.filter(this.configService.MSG_USER_LOGGEDIN);
        this.messageService.filter(this.configService.MSG_SHOW_PROFILE); /** PROFILE is Home */
      }
    })
  }
 
}

interface User{
  email:string;
  password:string;
  passwordAgain:string;
  firstname:string;
  lastname:string;
  healthcard:string;
  phone:string;
  responder:string;
}
