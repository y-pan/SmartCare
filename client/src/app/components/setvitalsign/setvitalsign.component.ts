import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-setvitalsign',
  templateUrl: './setvitalsign.component.html',
  styleUrls: ['./setvitalsign.component.css']
})
export class SetvitalsignComponent implements OnInit {
  vitalSigns:VitalSigns;
  displaySetVitalsign:boolean;
  errorInSetVitalsign:string;
  okInSetVitalsign:string;
  patientInfo:string;
  constructor(private configService:ConfigService
    , private dataService:DataService
    , private messageService:MessageService) { 

      this.messageService.listen().subscribe((msg:any)=>{
        if(msg == this.configService.MSG_SHOW_ENTERVITALSIGNS){
          this.display(true);
        }else{
          this.display(false);
        }
      })

    }

  ngOnInit() {
    this.clear();
  }
  
  display(toDisplay:boolean){
    this.displaySetVitalsign = toDisplay;

    if(toDisplay){
      // no need to get data from db, just show the form.
      this.patientInfo = this.dataService.getTargetPatientBasic();

    }else{
      this.okInSetVitalsign = "";
    }
  }

  onSubmit(){
    let json = this.vitalSigns;
    let pid = this.dataService.getTargetPatientId();
			if(!pid){
				this.errorInSetVitalsign = "No patient selected yet, you should search & select a patient first.";
				return;
			}
    json.patient = pid;
    this.dataService.addVitalsign(json).subscribe((res:Response) => {
      if(res['err']){
        this.errorInSetVitalsign = "Some error occurred, try again later";
        this.errorInSetVitalsign = "";
      }else{
        this.okInSetVitalsign = "Vital signs added successfully."
        this.clear();
      }
    });
  }

  clear(){
    this.vitalSigns = {
      temperature:null,
      heartrate:null,
      bloodpressure:null,
      respiratory:null,
      patient:""
    }
  }

}
interface VitalSigns{
  temperature?:number;
  heartrate?:number;
  bloodpressure?:number;
  respiratory?:number;
  patient?:string;
}