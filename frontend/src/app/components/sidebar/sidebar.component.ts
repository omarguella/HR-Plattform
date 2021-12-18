import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {
	user: User;
	ROLES = {
		ADMIN: 'ADMIN',
		HR: 'HR',
		SALESMAN: 'SM'
	};

	constructor(private userService: UserService) {
	}

	ngOnInit(): void {
		this.fetchUser();
	}

	fetchUser(): void {
		this.userService
			.getOwnUser()
			.subscribe(user => {
				this.user = user;
			});
	}
}
