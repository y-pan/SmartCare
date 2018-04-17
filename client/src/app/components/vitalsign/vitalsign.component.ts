import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-vitalsign',
  templateUrl: './vitalsign.component.html',
  styleUrls: ['./vitalsign.component.css']
})
export class VitalsignComponent implements OnInit {
  displayVitalsign:boolean;
  errorInVitalsign:string;
  user:any;
  vitalsigns:Vitalsign[];

  constructor(
    private configService:ConfigService
    , private dataService:DataService
    , private messageService:MessageService) { 

      this.messageService.listen().subscribe((msg:any)=>{
        if(msg == this.configService.MSG_SHOW_MYVITALSIGNS){
          this.display(true);
        }else{
          this.display(false);
        }
      })
    }

  ngOnInit() {
  }

  display(toDisplay:boolean){
    this.displayVitalsign = toDisplay;
    if(toDisplay){
      this.user = this.dataService.getLoginUser();
      this.dataService.getVitalsignsByPatient(this.user['_id']).subscribe((res:Response)=>{
        this.vitalsigns = res['data'];
      });
    }
  }
}

interface Vitalsign{
  temperature?:Number;
  heartrate?:Number;
  bloodpressure?:Number;
  respiratory?:Number;
  date?:string; /** no need to show on UI */
  _id?:string; /** no need to show on UI */
  patient?:string; /** no need to show on UI */
}