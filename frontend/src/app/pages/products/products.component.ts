import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/Product';
import { OpenCrxService } from '../../services/open-crx.service';
import { MatTable } from '@angular/material/table';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.css' ]
})
export class ProductsComponent implements OnInit {

	products: Product[] = [];

	@ViewChild(MatTable) table: MatTable<Product>;
	displayedColumns: string[] = [ 'name', 'description', 'productnumber' ];

	@ViewChild('deleteModal') deleteModal: any;
	@ViewChild('updateModal') updateModal: any;

	constructor(private openCrxService: OpenCrxService) {
	}

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts(): void {
		this.openCrxService
			.getProducts()
			.subscribe(data => {
				this.products = data;
			});
	}
}
