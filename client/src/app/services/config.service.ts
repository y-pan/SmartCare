import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  /** signals to show/hide some nav tab */
  MSG_ON_NAV_HOME: string = "onNavHome";
  MSG_ON_NAV_LOGIN: string = "onNavLogin";
  MSG_ON_NAV_SIGNUP: string = "onNavSignUp";
  MSG_ON_NAV_MYTIPS: string = "onNavMyTips";
  MSG_ON_NAV_MYVITALSIGNS: string = "onNavMyVitalsigns";
  MSG_ON_NAV_SYMPTOMS:string = "MSG_ON_NAV_SYMPTOMS";
  MSG_ON_NAV_GAMES:string = "MSG_ON_NAV_GAMES";

  /** signals to show/hide components, triggered by nav */
  MSG_SHOW_PROFILE:string = "showUserProfile"; /** show user profile like name, email,... */
  MSG_SHOW_LOGIN:string = "showLoginForm";
  MSG_SHOW_SIGNUP:string = "showSignUpForm";
  MSG_USER_LOGGEDIN:string = "loggedIn";
  MSG_USER_LOGGEDOUT:string = "loggedOut";
  
  /** patient parts */  
  MSG_SHOW_MYTIPS: string = "showMyTips"; /** show tips for patient, sent by a nurse */
  MSG_SHOW_MYVITALSIGNS:string = "showMyVitalsigns"; /** show vitalsigns for patient, added by a nurse */
  MSG_SHOW_SENDALERT:string = "MSG_SHOW_ALERT";
  MSG_SHOW_SYMPTOMS:string = "MSG_SHOW_SYMPTOMS";
  MSG_SHOW_GAMES:string = "MSG_SHOW_GAMES";

  /** nurse parts */
  MSG_SHOW_SEARCHPATIENT:string="MSG_SHOW_SEARCHPATIENT"; 
  MSG_SHOW_ENTERVITALSIGNS:string="showEnterVitalSigns"; /** for nurse */
  MSG_SHOW_SENDTIPS:string = "showSendTips"; /** for nurse */


  

  constructor() { }

}
