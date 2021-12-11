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

	activeSocialRecord: Socialrecord;

	updatedSocialRecord: Socialrecord;

	newDescription: string;
	newYear: number;
	newTargetValue: number;
	newActualValue: number;
	newBonus: number;
	newComment: string;

	@ViewChild(MatTable) table: MatTable<Socialrecord>;
	displayedColumns: string[] = [ 'description', 'year', 'targetValue', 'actualValue', 'bonus', 'comment', 'action' ];

	@ViewChild('deleteModal') deleteModal: any;
	@ViewChild('updateModal') updateModal: any;

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

	updateSocialRecord(id: string, newValues: Socialrecord): void {
		this.socialRecordService
			.updateSocialRecord(id, newValues)
			.subscribe();
	}

	addSocialRecord(): void {
		const _sr = new Socialrecord(
			undefined,
			this.newDescription,
			this.sid, this.newYear,
			this.newTargetValue,
			this.newActualValue,
			this.newBonus,
			this.newComment
		);

		this.socialRecordService
			.createSocialRecord(_sr)
			.subscribe((data) => {
				this.socialRecords.push(data);
				this.table.renderRows();
			});
	}

	handleChange(): void {
		this.newBonus = Math.round((this.newActualValue / this.newTargetValue) * 50) || undefined;
	}

	handleChangeEditModal(): void {
		this.updatedSocialRecord.bonus =
			Math.round(
				(this.updatedSocialRecord.actualValue / this.updatedSocialRecord.targetValue) * 50)
			|| undefined;
	}

	showCloseDeleteModal(): void {
		const modal = this.deleteModal.nativeElement;
		modal.classList.toggle('active');
	}

	showCloseUpdateModal(): void {
		const modal = this.updateModal.nativeElement;
		modal.classList.toggle('active');
	}

	handleDeleteClick(sr: Socialrecord): void {
		this.activeSocialRecord = { ...sr };
		this.showCloseDeleteModal();
	}

	handleEditClick(sr: Socialrecord): void {
		this.activeSocialRecord = { ...sr };
		this.updatedSocialRecord = { ...sr };
		this.showCloseUpdateModal();
	}

}
