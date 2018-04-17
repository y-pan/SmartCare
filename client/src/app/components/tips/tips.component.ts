import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  displayMyTips:boolean;
  errorInMyTips:string;
  tips:Tip[];
  user:any;
  hasReloaded:boolean;
  constructor(   
    private configService:ConfigService
    , private dataService:DataService
    , private messageService:MessageService) { 
      this.messageService.listen().subscribe((msg:any)=>{
        if(msg == this.configService.MSG_SHOW_MYTIPS){
          console.log("MSG_SHOW_MYTIPS ")
          this.display(true);
        }else{
          this.display(false);
        }
      })
    }

  ngOnInit() {

  }

  display(toDisplay:boolean){
    this.hasReloaded = false;
    this.displayMyTips = toDisplay;
    this.user = this.dataService.getLoginUser();
    if(toDisplay){
        this.errorInMyTips = "";
        
      /** tips array contains tip_id, inside user doc, need to check if some change made by a Nurse sending tips to patient */
      this.dataService.checkTipChanged().subscribe((res:Response)=>{
        if(res['err']){
            this.errorInMyTips = "Some error occurred, try again later."
        }else{
          this.user.tips = res['data'];
          if(res['data'] != 0){
            /** some tip changes, reload tips only */
            this.dataService.reloadMyTips().subscribe((res2:Response) => {
                if(res2['err']){
                    this.errorInMyTips = "Some error occurred in reloading tips, try again later."
                }else{
                    this.user['tips'] = res2['data'];
                    this.hasReloaded = true;
                    this.fetchTipsDetail(this.user.tips);
                }
            })
          }
        }
      }) 

      if(!this.hasReloaded){
        this.fetchTipsDetail(this.user.tips);
      }
    //   this.dataService.getMyTips(this.user['_id']).subscribe((res:Response)=>{
    //     this.tips = res['data'];
    //     console.log(this.tips);
    //   });
    }
  }

  fetchTipsDetail(tipIds:string[]){
      if(!tipIds || tipIds.length == 0){
          return;
      }
      console.log("do fetchTipsDetail...");
      this.dataService.getTipsDetails(tipIds).subscribe((res:Response) =>{
          if(res['err']){
              this.errorInMyTips = "Some error, try to refresh later.";
          }else{
              this.tips = res['data'];
          }
      })
  }
}


interface Tip{
  date?:string,
  _id?:string,
  content?:string
}
