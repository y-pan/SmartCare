import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchpatient',
  templateUrl: './searchpatient.component.html',
  styleUrls: ['./searchpatient.component.css']
})
export class SearchpatientComponent implements OnInit {

  searchPatient:SearchPatient;

  targetPatient:any; 
  searchPatientResults:any;
  patientInfo:string;

  targetPatientId:string;

  toDisplaySearchPatient:boolean;
  errInSearchPatient:string;
  okInSearchPatient:string;


  constructor(private dataService:DataService
    , private fb:FormBuilder
    , private messageService: MessageService
    , private configService: ConfigService) {
        
        this.messageService.listen().subscribe((msg:any) =>{
            switch(msg){
              case this.configService.MSG_SHOW_SEARCHPATIENT:
                this.display(true);break;
              default:
                this.display(false);break;
            }
          });
     }

  ngOnInit() {

  }
  display(toDisplay:boolean){
      this.toDisplaySearchPatient = toDisplay;
      if(toDisplay){
        this.initSearchPatient();
      }
  }

  initSearchPatient(){
 
      this.searchPatient = {
        email:"",
        firstname:"",
        lastname:"",
        healthcard:"",
        phone:"",
        responder:""
      }
  }
  onSelect(index,id){
    this.targetPatientId = id;
    this.targetPatient = this.searchPatientResults.find(p => p._id == id);
    this.dataService.setTargetPatient(this.targetPatient);
    this.patientInfo = this.dataService.getTargetPatientBasic();
  }

  
  onSubmit(){
    //   console.log(this.searchPatient);

      this.dataService.searchPatient(this.searchPatient).subscribe((res:Response)=>{
          if(res['err']){
              this.errInSearchPatient = res['err'];
              this.okInSearchPatient = "";
          }else{
            this.errInSearchPatient = "";
            this.okInSearchPatient = "";

            this.searchPatientResults = res['data'];

            // this.targetPatientId = "";
            // this.patientInfo = "";
            // this.targetPatient = null;
            // this.dataService.setTargetPatient(null);
// panyunkui2@gmail.com
            // this.targetPatient = this.searchPatientResults[0]; // default select 0, nurse need to adjust on page (radio button)
            // this.dataService.setTargetPatient(this.targetPatient);
            // this.targetPatientId = this.dataService.getTargetPatientId()
            // this.patientInfo = this.dataService.getTargetPatientBasic();

            if( this.searchPatientResults && this.searchPatientResults.length == 1){
              this.targetPatient = this.searchPatientResults[0]; // default select 0, nurse need to adjust on page (radio button)
              this.dataService.setTargetPatient(this.targetPatient);
              this.targetPatientId = this.dataService.getTargetPatientId()
              this.patientInfo = this.dataService.getTargetPatientBasic();
            }else{
              this.targetPatientId = "";
              this.patientInfo = "";
              this.targetPatient = null;
              this.dataService.setTargetPatient(null);
            }
            
            // console.log(this.searchPatientResults);
        }
      })
  }
}

interface SearchPatient{
    email?:string;
    firstname?:string;
    lastname?:string;
    healthcard?:string;
    phone?:string;
    responder?:string;
}
