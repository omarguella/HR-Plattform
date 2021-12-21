import { Component, OnInit, ViewChild } from '@angular/core';
import { Bonussalary } from '../../models/Bonussalary';
import { MatTable } from '@angular/material/table';
import { Socialrecord } from '../../models/Socialrecord';
import { BonussalaryService } from '../../services/bonussalary.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-closed-bonussalaries',
	templateUrl: './closed-bonussalaries.component.html',
	styleUrls: [ './closed-bonussalaries.component.css' ]
})
export class ClosedBonussalariesComponent implements OnInit {
	user: User;
	closedSalaries: Bonussalary[];

	@ViewChild(MatTable) table: MatTable<Socialrecord>;
	displayedColumns: string[] = ['year', 'value', 'remarks' ];

	constructor(private bonussalaryService: BonussalaryService, private userService: UserService) {
	}

	ngOnInit(): void {
		this.getSelfAndSalaries();
	}

	getSelfAndSalaries(): void {
		this.userService
			.getOwnUser()
			.subscribe((user) => {
				this.user = user;
				this.getOwnSalaries(user.sid);
			});
	}

	getOwnSalaries(sid: number): void {
		this.bonussalaryService
			.getClosedBySid(sid)
			.subscribe((salaries) => {
				this.closedSalaries = salaries;
			});
	}

}
