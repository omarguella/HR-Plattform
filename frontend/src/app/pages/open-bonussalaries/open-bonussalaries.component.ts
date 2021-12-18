import { Component, OnInit, ViewChild } from '@angular/core';
import { Bonussalary } from '../../models/Bonussalary';
import { BonussalaryService } from '../../services/bonussalary.service';
import { MatTable } from '@angular/material/table';
import { Socialrecord } from '../../models/Socialrecord';

@Component({
	selector: 'app-open-bonussalaries',
	templateUrl: './open-bonussalaries.component.html',
	styleUrls: [ './open-bonussalaries.component.css' ]
})
export class OpenBonussalariesComponent implements OnInit {
	openSalaries: Bonussalary[];

	@ViewChild(MatTable) table: MatTable<Socialrecord>;
	displayedColumns: string[] = [ 'sid', 'year', 'value', 'remarks', 'action' ];

	constructor(private bonussalaryService: BonussalaryService) {
	}

	ngOnInit(): void {
		this.getOpenSalaries();
	}

	getOpenSalaries(): void {
		this.bonussalaryService
			.getOpenBonussalaries()
			.subscribe((salaries) => {
				this.openSalaries = salaries;
			});
	}

	confirmBonussalary(bonussalary: Bonussalary): void {
		this.bonussalaryService
			.confirmBonussalary(bonussalary)
			.subscribe(() => window.location.reload());
	}

}
