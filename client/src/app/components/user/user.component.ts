import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:any;
  toDisplayProfile:boolean;
  text:string = "mytext"
  // myCourses:
  constructor(
    private configService:ConfigService
    , private messageService:MessageService
    , private dataService:DataService
  ) { 

    this.messageService.listen().subscribe((msg:any) =>{
      switch(msg){
        case this.configService.MSG_SHOW_PROFILE:
          this.display(true);break;
        default:
          this.display(false);break;
      }
    });
  }

  ngOnInit() {

  }

  display(toDisplay:boolean){
    this.toDisplayProfile = toDisplay;
    if(this.toDisplayProfile){
      // this.mock_user();
      this.user = this.dataService.getLoginUser();
    }
  }

}
