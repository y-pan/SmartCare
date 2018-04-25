import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {

  displaySymptoms:boolean;
  errorInSymptoms:string;
  symptoms:any;
  selectedSymptoms:string[];
  // hasLoaded:boolean;
  disease:any;
  constructor(
    private configService:ConfigService
    , private messageService:MessageService
    , private dataService:DataService
  ) { 

    this.messageService.listen().subscribe((msg:any)=>{
      if(msg == this.configService.MSG_SHOW_SYMPTOMS){
        this.display(true);
      }else{
        this.display(false);
      }
    })
  }

  ngOnInit() {
  }

  display(toDisplay:boolean){
    this.displaySymptoms = toDisplay;
    if(toDisplay){
      
      this.dataService.loadSymptoms().subscribe((res:Response) => {
        if(res['err']){
          this.errorInSymptoms = "Some error occured, try again later.";
        }else{
          this.symptoms = res['data'];
          // console.log(this.symptoms)
        }
      });
    }
  }

	onSelect(e, id) {
		if (e) {
      /** do select */
      if(this.selectedSymptoms == null){
        this.selectedSymptoms = [];
      }
			this.selectedSymptoms.push(id);
		} else {
			this.selectedSymptoms.splice(this.selectedSymptoms.indexOf(id));
		}
  }
  
  onSubmitSymptoms(){
    if(this.selectedSymptoms == null || this.selectedSymptoms.length == 0){
      this.errorInSymptoms = "You need to select symptom(s) first. If you don't have any of those symptoms, then you should be fine."
      return;
    }
    this.dataService.getOneDiseaseBestMatch(this.selectedSymptoms).subscribe((res:Response) => {
      if(res['err']){
        this.errorInSymptoms = "Some connection error occurred, try again later.";
      }else{
        this.errorInSymptoms = "";
        this.disease = res['data'];
      }
    });
  }
}

