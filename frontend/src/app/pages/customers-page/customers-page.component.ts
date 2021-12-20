import {Component, OnInit, ViewChild} from '@angular/core';
import { OpenCrxService } from "../../services/open-crx.service";
import {MatTable} from "@angular/material/table";
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css']
})
export class CustomersPageComponent implements OnInit {

	customers: Customer[] = [];

	@ViewChild(MatTable) table: MatTable<Customer>;
	displayedColumns: string[] = ['id', 'fullname', 'rating'];

  constructor(private OpenCrxService: OpenCrxService) { }

  ngOnInit(): void {
		this.getCustomers()
  }

	getCustomers(): void {
		this.OpenCrxService
			.getCustomers()
			.subscribe(data => {
				this.customers = data;
			});
	}
}
