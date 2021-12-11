import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesmanService } from '../../services/salesman.service';
import { Salesman } from '../../models/Salesman';
import { SocialRecordService } from '../../services/social-record.service';
import { Socialrecord } from '../../models/Socialrecord';
import { MatTable } from '@angular/material/table';
import { OpenCrxService } from '../../services/open-crx.service';
import { SingleOrder } from '../../models/Order';
import { Bonussalary } from '../../models/Bonussalary';

@Component({
	selector: 'app-bonussalary',
	templateUrl: './bonussalary.component.html',
	styleUrls: [ './bonussalary.component.css' ]
})
export class BonussalaryComponent implements OnInit {
	sid: number;
	yearOfPerformance: number;
	salesman: Salesman;
	socialRecords: Socialrecord[];
	singleOrders: SingleOrder[];

	bonusSocialRecords = 0;
	bonusOrders = 0;
	bonusTotal = 0;
	remarks = '';

	showNotification = false;

	@ViewChild(MatTable) table: MatTable<Socialrecord>;
	displayedColumns: string[] = [ 'description', 'targetValue', 'actualValue', 'bonus', 'comment' ];
	displayedColumnsSales: string[] = [ 'productName', 'customer', 'rating', 'quantity', 'bonus' ];

	constructor(
		private route: ActivatedRoute,
		private salesmanService: SalesmanService,
		private socialRecordService: SocialRecordService,
		private openCrxService: OpenCrxService
	) {
	}

	ngOnInit(): void {
		this.sid = parseInt(this.route.snapshot.paramMap.get('sid'), 10);
		this.getSalesman(this.sid);
	}

	getSalesman(sid: number): void {
		this.salesmanService
			.getSalesmanBySid(sid)
			.subscribe((data) => this.salesman = data);
	}

	handleYearChange(): void {
		if (this.sid && this.yearOfPerformance) {
			this.socialRecordService
				.getSocialRecordsBySidAndYear(this.sid, this.yearOfPerformance)
				.subscribe((data) => {
					this.socialRecords = data;
					this.openCrxService
						.getOrdersBySidAndYear(this.sid, this.yearOfPerformance)
						.subscribe((orders) => {
							const singleOrders = [];
							orders.map((order) => {
								order.positions.forEach(p => {
									singleOrders.push(new SingleOrder(order.year, order.customer, order.salesman, p.product, p.quantity));
								});
							});
							this.singleOrders = singleOrders;
							this.totalBonus();
						});
				});
		} else {
			this.socialRecords = [];
			this.singleOrders = [];
		}
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

	calculateSocialBonus(): number {
		let tmp = 0;
		this.socialRecords.forEach((rec) => {
			tmp += rec.bonus;
		});
		return tmp;
	}

	calculateOrderBonus(): number {
		let tmp = 0;
		this.singleOrders.forEach((so) => {
			tmp += so.bonus;
		});
		return tmp;
	}

	totalBonus(): void {
		this.bonusSocialRecords = this.calculateSocialBonus();
		this.bonusOrders = this.calculateOrderBonus();
		this.bonusTotal = this.bonusSocialRecords + this.bonusOrders;
	}

	addBonussalary(): void {
		this.salesmanService
			.addBonusSalary(new Bonussalary(this.sid, this.yearOfPerformance, this.bonusTotal))
			.subscribe(() => {
				this.showNotification = true;
				setTimeout(() => this.showNotification = false, 3000);
			});
	}

	handleManualBonusChange(): void {
		this.bonusTotal = this.bonusSocialRecords + this.bonusOrders;
	}
}
