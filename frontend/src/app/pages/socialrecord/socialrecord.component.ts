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

	newSocialRecord: Socialrecord;
	hasError: boolean;

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
		this.newSocialRecord = new Socialrecord(
			undefined,
			undefined,
			this.sid,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		);
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
			.subscribe(() => {
				window.location.reload();
			});
	}

	addSocialRecord(): void {
		if (!this.validateInput()) {
			this.hasError = true;
			return;
		}

		this.socialRecordService
			.createSocialRecord(this.newSocialRecord)
			.subscribe((data) => {
				this.socialRecords.push(data);
				this.table.renderRows();
				this.clearFields();
				this.hasError = false;
			});
	}

	validateInput(): boolean {
		return (
			this.newSocialRecord.description
			&& this.newSocialRecord.year
			&& this.newSocialRecord.targetValue
			&& this.newSocialRecord.actualValue
			&& true
		);
	}

	handleChangeNewRecord(): void {
		this.newSocialRecord.bonus =
			this.calculateBonus(
				this.newSocialRecord.targetValue,
				this.newSocialRecord.actualValue
			);
	}

	handleChangeEditModal(): void {
		this.updatedSocialRecord.bonus =
			this.calculateBonus(
				this.updatedSocialRecord.targetValue,
				this.updatedSocialRecord.actualValue
			);
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

	calculateBonus(a: number, b: number): number {
		if (!a || !b) {
			return 0;
		}
		return Math.round((b / a) * 50 + ((b - a) / 2) * 30);
	}

	clearFields(): void {
		this.newSocialRecord = new Socialrecord(
			undefined,
			undefined,
			this.sid,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		);
	}

}
