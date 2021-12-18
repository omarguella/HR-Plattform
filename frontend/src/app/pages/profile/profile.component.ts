import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	user: User;
	updatedValues: User;
	isChanged = false;

	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;

	constructor(private userService: UserService) {
	}

	ngOnInit(): void {
		this.getSelf();
	}

	getSelf(): void {
		this.userService
			.getOwnUser()
			.subscribe((user) => {
				this.user = user;
				this.updatedValues = { ...user };
			});
	}

	equals(a: User, b: User): boolean {
		for (const key of Object.keys(a)) {
			if (a[key] !== b[key]) {
				return false;
			}
		}
		return true;
	}

	handleChange(): void {
		this.isChanged = !this.equals(this.user, this.updatedValues);
	}

	saveChanges(): void {
		console.log(this.updatedValues);
		this.userService
			.updateUser(this.user.username, this.updatedValues)
			.subscribe();
	}

	savePassword(): void {

	}
}
