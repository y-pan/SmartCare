import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  toDisplayGames:boolean;
  errorInGames:string;
  games:any;

  constructor(
    private configService:ConfigService
    , private dataService:DataService
    , private messageService:MessageService
  ) {

    this.messageService.listen().subscribe((msg:any)=>{
      if(msg == this.configService.MSG_SHOW_GAMES){
        this.display(true);
      }else{
        this.display(false);
      }
    })

   }

  ngOnInit() {
  }

  display(toDisplay:boolean){
    this.toDisplayGames = toDisplay;
    if(this.toDisplayGames){
      /** basically just load once, as not changed frequently */
      if(this.games == null){
        this.dataService.getGames().subscribe((res:Response) => {
          if(res['err']){
            this.errorInGames = "Unknow error, try again later."
          }else{
            if(!res['data']){
              this.errorInGames = "No game available at the monent."
            }else{
              this.games = res['data'];
              console.log(this.games)
            }
          }
        });
      }
    }
  }
  
}
