import { Component, OnInit, ViewChild } from '@angular/core';
import { Socialrecord } from '../../models/Socialrecord';
import { SocialRecordService } from '../../services/social-record.service';
import { SalesmanService } from '../../services/salesman.service';
import { ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { Salesman } from '../../models/Salesman';

@Component({
	selector: 'app-socialrecord',
	templateUrl: './socialrecord.component.html',
	styleUrls: [ './socialrecord.component.css' ]
})
export class SocialrecordComponent implements OnInit {
	sid: number;
	salesman: Salesman;
	socialRecords: Socialrecord[] = [];

	newDescription: string;
	newYear: number;
	newTargetValue: number;
	newActualValue: number;
	newBonus: number;
	newComment: string;

	@ViewChild(MatTable) table: MatTable<Socialrecord>;
	displayedColumns: string[] = [ 'description', 'targetValue', 'actualValue', 'bonus', 'comment', 'action' ];

	constructor(
		private route: ActivatedRoute,
		private socialRecordService: SocialRecordService,
		private salesmanService: SalesmanService
	) {
	}

	ngOnInit(): void {
		this.sid = parseInt(this.route.snapshot.paramMap.get('sid'), 10);
		this.getSocialRecordsBySid(this.sid);
		this.getSalesman(this.sid);
	}

	getSalesman(sid: number): void {
		this.salesmanService
			.getSalesmanBySid(sid)
			.subscribe((data) => this.salesman = data);
	}

	getSocialRecordsBySid(sid: number): void {
		this.socialRecordService
			.getSocialRecordsBySid(sid)
			.subscribe((data) => this.socialRecords = data);
	}

	deleteSocialRecord(id: string): void {
		this.socialRecordService
			.deleteSocialRecord(id)
			.subscribe(() => {
				this.socialRecords = this.socialRecords.filter((sr) => sr._id !== id);
			});
	}

	addSocialRecord(): void {
		console.log(this.newDescription, this.newTargetValue, this.newActualValue, this.newBonus);
	}

	handleChange(): void {
		this.newBonus = ((this.newActualValue / this.newTargetValue) ** 2 * 50) || undefined;
	}

}
