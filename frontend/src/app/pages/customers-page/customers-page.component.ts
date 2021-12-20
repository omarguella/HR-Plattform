import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenCrxService } from '../../services/open-crx.service';
import { MatTable } from '@angular/material/table';
import { Customer } from '../../models/Customer';

@Component({
	selector: 'app-customers-page',
	templateUrl: './customers-page.component.html',
	styleUrls: [ './customers-page.component.css' ]
})
export class CustomersPageComponent implements OnInit {

	customers: Customer[] = [];

	@ViewChild(MatTable) table: MatTable<Customer>;
	displayedColumns: string[] = [ 'fullname', 'rating' ];

	constructor(private openCrxService: OpenCrxService) {
	}

	ngOnInit(): void {
		this.getCustomers();
	}

	getCustomers(): void {
		this.openCrxService
			.getCustomers()
			.subscribe(data => {
				this.customers = data;
			});
	}

	ratingToString(rating: number): string {
		switch (rating) {
			case 1:
				return 'Excellent';
			case 2:
				return 'Very Good';
			case 3:
				return 'Good';
			default:
				return 'OK';
		}
	}
}
