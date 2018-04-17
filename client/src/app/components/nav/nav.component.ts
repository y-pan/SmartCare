import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn:boolean;
  myCourses:any;
  allCourses:any;
  err:string;
  displayNav:number;
  user:any;
  isNurseLoggedIn:boolean;
  isPatientLoggedIn:boolean;

  @Output() onFilter:EventEmitter<any> = new EventEmitter(); /** all for messaging to tell components to react upon messages */

  constructor(
    private configService:ConfigService
    , private messageService:MessageService
    , private dataService:DataService
  ) { 
    
      this.messageService.listen().subscribe((msg:any)=>{
        switch(msg){
          case this.configService.MSG_USER_LOGGEDOUT:
            this.doAfterLoggedOut();break;
          case this.configService.MSG_USER_LOGGEDIN:
            this.doAfterLoggedIn();break;
          case this.configService.MSG_ON_NAV_HOME:
            this.displayNav = 0;
            break;
          case this.configService.MSG_ON_NAV_LOGIN:
            this.displayNav = -1;
            break;
          case this.configService.MSG_ON_NAV_SIGNUP:
            this.displayNav = -2;
            break;
          case this.configService.MSG_ON_NAV_MYTIPS:
            this.displayNav = 1;
            break;
          case this.configService.MSG_ON_NAV_MYVITALSIGNS:
            this.displayNav = 2;
            break;  
        }
      })
    
  }

  
  ngOnInit() {
    this.err = "";
    this.displayNav = -1;
  }
 


  private logout(){/** This method logs user out */
    if(confirm("Are you sure to logout?")){
      this.messageService.filter(this.configService.MSG_USER_LOGGEDOUT);
      this.isLoggedIn = false;
      // this.dataService.setStudent(null);
  
      this.messageService.filter(this.configService.MSG_SHOW_LOGIN);
      /** also need to clear local session ??? */
    }
    
  }
  doAfterLoggedIn(){
    this.displayNav = 0;

    this.user = this.dataService.getLoginUser();

    if(this.user.usertype == 0){
      this.isNurseLoggedIn = true;
      this.isPatientLoggedIn = false;
    }else{
      this.isPatientLoggedIn = true;
      this.isNurseLoggedIn = false;
    }

    this.isLoggedIn = true;

  } 
  doAfterLoggedOut(){
    this.displayNav = -1;
    this.isLoggedIn = false;
    this.isNurseLoggedIn = false;
    this.isPatientLoggedIn = false;
    // this.messageService.filter(this.configService.MSG_ON_NAV_LOGIN);
  }
  showSignUp(){
    this.displayNav = -2;
    this.messageService.filter(this.configService.MSG_SHOW_SIGNUP);
    // this.messageService.filter(this.configService.MSG_ON_NAV_SIGNUP);
  }
  showLogin(){
    this.displayNav = -1;
    this.messageService.filter(this.configService.MSG_SHOW_LOGIN);
    // this.messageService.filter(this.configService.MSG_ON_NAV_LOGIN);
  }

  openEnterVitalSigns(){
    this.displayNav = 11;
    this.messageService.filter(this.configService.MSG_SHOW_ENTERVITALSIGNS);  

  }

  openSendTips(){
    this.displayNav = 12;
    this.messageService.filter(this.configService.MSG_SHOW_SENDTIPS);  
  }

  getMyTips(){
    this.displayNav = 2;
    this.messageService.filter(this.configService.MSG_SHOW_MYTIPS);  
    // this.messageService.filter(this.configService.MSG_ON_NAV_MYCOURSES);
  }

  getMyVitalSigns(){
    this.displayNav = 1;
    
    this.messageService.filter(this.configService.MSG_SHOW_MYVITALSIGNS);
    // this.messageService.filter(this.configService.MSG_ON_NAV_ALLCOURSES);
  }
  showHome(){
    this.displayNav = 0;    
    this.messageService.filter(this.configService.MSG_SHOW_PROFILE);
    // this.messageService.filter(this.configService.MSG_ON_NAV_HOME);
  }
}