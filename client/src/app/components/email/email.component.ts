import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  alertEmail:AlertEmail;
  errorInAlertEmail:string;
  okInAlertEmail:string;
  displayAlertEmail:boolean;
  hasInited:boolean;

  constructor(private configService:ConfigService
    , private dataService:DataService
    , private messageService:MessageService) { 

      this.messageService.listen().subscribe((msg:any)=>{
        if(msg == this.configService.MSG_SHOW_SENDALERT){
          this.display(true);
        }else{
          this.display(false);
        }
      })

    }

  ngOnInit() {
    this.errorInAlertEmail = "";
    this.okInAlertEmail = "";
    this.initAlertEmail();
  }
  display(toDisplay:boolean){
    this.displayAlertEmail = toDisplay;
    if(toDisplay){
      if(!this.hasInited){
        this.hasInited = true;
        this.initAlertEmail();
      }
    }
  }
  onSubmit(){
    this.dataService.sendAlertEmail(this.alertEmail).subscribe((res:Response)=>{
      if(res['err']){
        this.errorInAlertEmail = "Failed to send alert, try again!";
      }else{
        this.okInAlertEmail = "Alert send successfully!"
        this.initAlertEmail();
      }
    })
  }

  initAlertEmail(){
    let _user = this.dataService.getLoginUser();
    if(_user){
      this.alertEmail = {
        from:_user['email'],
        to:_user['responder'],
        fullname:_user['firstname'] + " " + _user['lastname'],
        phone:_user['phone'],
        healthcard:_user['healthcard'],
        text:""
      }
    }
    
  }
}

interface AlertEmail{
  from?:string;
  to?:string;
  fullname?:string;
  healthcard?:string;
  phone?:string;
  text?:string;
}
