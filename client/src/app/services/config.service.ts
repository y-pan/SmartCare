import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {


  MSG_ON_NAV_HOME: any = "onNavHome";
  MSG_ON_NAV_LOGIN: any = "onNavLogin";
  MSG_ON_NAV_SIGNUP: any = "onNavSignUp";
  MSG_ON_NAV_MYTIPS: any = "onNavMyTips";
  MSG_ON_NAV_MYVITALSIGNS: any = "onNavMyVitalsigns";
  
  MSG_SHOW_MYTIPS: string = "showMyTips"; /** show tips for patient, sent by a nurse */
  MSG_SHOW_MYVITALSIGNS:string = "showMyVitalsigns"; /** show vitalsigns for patient, added by a nurse */
  MSG_SHOW_SENDALERT:string = "MSG_SHOW_ALERT";

  MSG_SHOW_ENTERVITALSIGNS:string="showEnterVitalSigns"; /** for nurse */
  MSG_SHOW_SENDTIPS:string = "showSendTips"; /** for nurse */

  MSG_SHOW_PROFILE: string = "showUserProfile"; /** show user profile like name, email,... */
  MSG_SHOW_LOGIN:string = "showLoginForm";
  MSG_SHOW_SIGNUP:string = "showSignUpForm";



  
  MSG_USER_LOGGEDIN:string = "loggedIn";
  MSG_USER_LOGGEDOUT:string = "loggedOut";
  MSG_HIDE_COURSES: string = "hideAllCourses";
  MSG_SHOW_COURSES: string = "showAllCourses"; /** all courses for everyone */

  constructor() { }

}
