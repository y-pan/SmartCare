import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {ConfigService} from './config.service'


@Injectable()
export class DataService {
  loginUser:any; /** after signup/login, keep the user info here */
  targetPatient:any; /** when nurse searched and select the patient, this obj will be set */
  serverMode:number = 0; /** 0-heroku, 1-localhost */
  
  getBaseApi(serverMode:number){
    if(serverMode == 0){
      return "https://smartcare1.herokuapp.com/api/";
    }else{
      return "http://localhost:8081/api/";
    }
  }

  userSignup(user:any):any {
    /** expecting user: {
        "usertype": 1,
        "email": "dummy3@gmail.com",
        "password": "plainpassword",
        "firstname": "dummy3",
        "lastname": "dummy3",
        "healthcard": "100200303",
        "phone": "6007009003",
        "responder": "panyunkui2@gmail.com",
    } */
    let url = this.getBaseApi(this.serverMode) + "user/signup";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};

    return this.http.post(url, JSON.stringify(user), headers).map((res:Response) => res.json());
    /** response is either: { "data": data} or  { "err": "some error"}*/
  }

  userLogin(user:any){
    /** expecting user: {email:email, password:password, usertype:usertype} */
    let url:string = this.getBaseApi(this.serverMode) + "user/login";   
    return this.http.post(
      url,
      JSON.stringify(user)
      ,{ headers: new Headers({ 'Content-Type': 'application/json' }) }
    ).map((res:Response) => res.json());
  }

  loadSymptoms(){
    let url = this.getBaseApi(this.serverMode) + "symptom/all";
    return this.http.get(url).map((res:Response) => res.json());
  }

  getOneDiseaseBestMatch(symptoms){
    /**{
  "symptoms":["5adfe5a01c75fc30bc337d7e", "5adfe7881c75fc30bc337d83"]
  returns the {data:disease}
} */
  // console.log(symptoms);
    let url = this.getBaseApi(this.serverMode) + "disease/getOneBestMatch";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify({symptoms:symptoms}), headers).map((res:Response) => res.json());
  }
  
  searchPatient(searchJson){
    /** expecting json: { email:email, firstname:firstname}, could be 1+ search critirias.
     * returns array of obj {data:[{user}]} that matches
     */
    let url = this.getBaseApi(this.serverMode) + "user/searchPatient";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify(searchJson), headers).map((res:Response) => res.json());
  }

  getUser(id){
    /** get user profile from db, applicable for both nurse & patient */
    let url = this.getBaseApi(this.serverMode) + "user/get?id=" + id;
    return this.http.get(url).map((res:Response) => res.json());
  }

  addVitalsign(json){
    /** add a 1 set of test result (vitalsigns) for a patient
     * expecting json: 
     *  {
        "temperature": 36.6,
        "heartrate": 70,
        "bloodpressure": 90,
        "respiratory": 20,
        "patient": "5ad4e90749cc8826d466bef4"
    }
     */
    let url = this.getBaseApi(this.serverMode) + "vitalsign/add";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify(json), headers).map((res:Response) => res.json());
  }

  getVitalsignsByPatient(id){
    /** Now is returning all records, in the future we can use pagenation techneque to show page by page */
    let url = this.getBaseApi(this.serverMode) + "vitalsign/getByPatient/" + id;
    return this.http.get(url).map((res:Response) => res.json());
  }

  addTip(tipJson){
    let url = this.getBaseApi(this.serverMode) + "tip/add";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify(tipJson), headers).map((res:Response) => res.json());
  }

  getAllTips(){
    let url = this.getBaseApi(this.serverMode) + "tip/all";
    return this.http.get(url).map((res:Response) => res.json());
  }
  sendTips(tipsJson){
    /**
     * tipsJson: {
                  "tips":[
                    "5ad4c54f43f617fda95cf04e",
                    "5ad4c54f43f617fda95cf04f",
                    "5ad4c54f43f617fda95cf050"
                  ],
                  "patient":"5ad4cd59f8591213fa5ad227",
                  "isSet":1
                }
     */
    let url = this.getBaseApi(this.serverMode) + "user/sendTip";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify(tipsJson), headers).map((res:Response) => res.json());
  }
  
  getPatientTips(tips){
    let url = this.getBaseApi(this.serverMode) + "tip/all";
    return this.http.get(url).map((res:Response) => res.json());
  }

  checkTipChanged(){
    let id = this.loginUser['_id'];
    let url = this.getBaseApi(this.serverMode) + "user/checkTipChanged/" + id;
    return this.http.get(url).map((res:Response) => res.json());
  }

  reloadMyTips(){ /** reload tips array in user doc, containing only tip_ids */
    let id = this.loginUser['_id'];
    let url = this.getBaseApi(this.serverMode) + "user/getMyTips/" + id;
    return this.http.get(url).map((res:Response) => res.json());
  }

  getTipsDetails(ids){
    /** get tips (from tip doc) by an array of tip_ids*/
    if(!ids || ids.length == 0){
      return;
    }
    let url = this.getBaseApi(this.serverMode) + "tip/getTips/";
    let tipJson = {tips:ids}

    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify(tipJson), headers).map((res:Response) => res.json());
  }

  sendAlertEmail(alertEmailJson){
    let url = this.getBaseApi(this.serverMode) + "user/alert";
    let headers:any = { headers: new Headers({ 'Content-Type': 'application/json' })};
    return this.http.post(url, JSON.stringify(alertEmailJson), headers).map((res:Response) => res.json());
  }

  constructor(public http:Http, private configService:ConfigService) {
    // console.log('Data service is connected ... ');
   }

   getLoginUser(){
     return this.loginUser;
   }
   setLoginUser(user){
     this.loginUser = user;
   }

   getTargetPatient(){
     return this.targetPatient;
   }

   getTargetPatientId(){
     if(this.targetPatient){
      return this.targetPatient['_id'];
     }else{
       return "";
     }
  }
  getTargetPatientBasic(){
    if(this.targetPatient){
      return this.targetPatient['firstname'] + " " +  this.targetPatient['lastname'] 
      +"|" + this.targetPatient['healthcard']
      + "|" + this.targetPatient["email"];
    }else{
      return "";
    }
    
  }

   setTargetPatient(patient:any){
     this.targetPatient = patient;
   }
}

