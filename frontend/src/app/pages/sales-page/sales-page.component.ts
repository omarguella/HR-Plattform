import { Component, OnInit, ViewChild } from '@angular/core';
import { SingleOrder } from '../../models/Order';
import { OpenCrxService } from '../../services/open-crx.service';
import { MatTable } from '@angular/material/table';

@Component({
	selector: 'app-sales-page',
	templateUrl: './sales-page.component.html',
	styleUrls: [ './sales-page.component.css' ]
})
export class SalesPageComponent implements OnInit {

	singleOrders: SingleOrder[] = [];
	@ViewChild(MatTable) table: MatTable<SingleOrder>;
	displayedColumns: string[] = [ 'year', 'salesman', 'product', 'customer', 'customerRating', 'quantity' ];

	constructor(private openCrxService: OpenCrxService) {
	}

	ngOnInit(): void {
		this.getSales();
	}

	getSales(): void {
		this.openCrxService
			.getOrders()
			.subscribe(orders => {
				const singleOrders = [];
				orders.map((order) => {
					order.positions.forEach(p => {
						singleOrders.push(new SingleOrder(order.year, order.customer, order.salesman, p.product, p.quantity));
					});
				});
				this.singleOrders = singleOrders;
			});
	}

	quantityToInt(quantity: number): number {
		return Math.round(quantity);
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
