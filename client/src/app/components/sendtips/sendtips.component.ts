import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'app-sendtips',
	templateUrl: './sendtips.component.html',
	styleUrls: ['./sendtips.component.css']
})
export class SendtipsComponent implements OnInit {
	tips: any;
	displaySendTips: boolean;
	errorInSendTips: string;
	okInSendTips: string;
	tipIds: string[];
	isSet: boolean;
	patientInfo:string;
	constructor(
		private configService: ConfigService
		, private dataService: DataService
		, private messageService: MessageService
	) {
		this.messageService.listen().subscribe((msg: any) => {
			if (msg == this.configService.MSG_SHOW_SENDTIPS) {
				this.display(true);
			} else {
				this.display(false);
			}
		})

	}

	ngOnInit() {

	}

	display(toDisplay: boolean) {
		this.okInSendTips = "";
		this.errorInSendTips = "";
		this.displaySendTips = toDisplay;
		if (toDisplay) {
			this.patientInfo = this.dataService.getTargetPatientBasic();
			this.tipIds = [];
			this.dataService.getAllTips().subscribe((res: Response) => {
				if (res['err']) {
					this.errorInSendTips = "Some error eccurred, try later."
					this.okInSendTips = "";
				} else {
					this.tips = res['data'];
					this.errorInSendTips = ""

				}
			});
		}
	}
	onSelect(e, id) {
		if (e) {
			/** do select */
			this.tipIds.push(id);
		} else {
			this.tipIds.splice(this.tipIds.indexOf(id));
		}
	}
	onSendTips() {
		if (this.tipIds.length > 0) {
			let pid = this.dataService.getTargetPatientId();
			if(!pid){
				this.errorInSendTips = "No patient selected yet, you should search & select a patient first.";
				return;
			}
			let json = {
				"tips": this.tipIds,
				"patient": pid,
				"isSet": this.isSet
			}
			this.dataService.sendTips(json).subscribe((res: Response) => {
				if (res['err']) {
					this.errorInSendTips = "Failed to send tips due to some error, try again later."
					this.okInSendTips = "";
				} else {
					this.errorInSendTips = ""
					this.okInSendTips = "Tips sent successfully!";
				}
			});
		}
	}
	onIsSet(e) {
		this.isSet = e;
	}
}
