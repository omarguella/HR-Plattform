import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Salesman } from '../../models/Salesman';
import { MatTable } from '@angular/material/table';
import { SalesmanService } from '../../services/salesman.service';

@Component({
	selector: 'app-salesman',
	templateUrl: './salesman.component.html',
	styleUrls: [ './salesman.component.css' ]
})
export class SalesmanComponent implements OnInit {
	salesmen: Salesman[] = [];
	hasError = false;

	activeSalesman: Salesman; // the clicked salesman needed for the modal
	updatedValues: Salesman;

	@ViewChild(MatTable) table: MatTable<Salesman>;
	displayedColumns: string[] = [ 'code', 'firstname', 'lastname', 'department', 'action' ];

	// Fields to create a new Salesman
	newSid: number;
	newCode: number;
	newFirstname: string;
	newLastname: string;
	newDepartment: string;

	@ViewChild('deleteModal') deleteModal: any;
	@ViewChild('updateModal') updateModal: any;


	constructor(private salesmanService: SalesmanService) {
	}

	ngOnInit(): void {
		this.getSalesman();
	}

	getSalesman(): void {
		this.salesmanService
			.getSalesman()
			.subscribe(data => {
				this.salesmen = data;
			});
	}

	createSalesman(): Promise<void> {
		if (!this.newSid || !this.newCode || !this.newFirstname || !this.newLastname) {
			this.hasError = true;
			return;
		}

		const _s = new Salesman(this.newSid, this.newCode, this.newFirstname, this.newLastname, this.newDepartment);
		this.salesmanService
			.createSalesman(_s)
			.subscribe(() => {
				this.salesmen.push(_s);
				this.table.renderRows();
				this.resetFields();
			});
	}

	deleteSalesman(sid: number): void {
		this.salesmanService
			.deleteSalesman(sid)
			.subscribe(() => {
				this.salesmen = this.salesmen.filter((s) => s.sid !== sid);
			});
	}

	updateSalesman(sid: number, updatedValues: Salesman): void {
		this.salesmanService
			.updateSalesman(sid, updatedValues)
			.subscribe((data) => {
				this.salesmen = this.salesmen.map((s) => s.sid === sid ? data : s);
			});
	}

	synchronizeSalesmen(): void {
		this.salesmanService
			.synchronize()
			.subscribe(
				() => {
					window.location.reload();
				}
			);
	}

	resetFields(): void {
		this.newSid = this.newCode = undefined;
		this.newFirstname = this.newLastname = this.newDepartment = '';
		this.hasError = false;
	}

	showCloseDeleteModal(): void {
		const modal = this.deleteModal.nativeElement;
		modal.classList.toggle('active');
	}

	showCloseUpdateModal(): void {
		const modal = this.updateModal.nativeElement;
		modal.classList.toggle('active');
	}

	handleDeleteClick(s: Salesman): void {
		this.activeSalesman = { ...s };
		this.showCloseDeleteModal();
	}

	handleEditClick(s: Salesman): void {
		this.activeSalesman = { ...s };
		this.updatedValues = { ...s };
		this.showCloseUpdateModal();
	}
}
