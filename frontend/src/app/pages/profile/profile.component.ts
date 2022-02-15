import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { Password } from '../../models/Password';
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

	error = false;
	success = false;
	message = '';

	ROLES = {
		ADMIN: 'ADMIN',
		HR: 'HR',
		SALESMAN: 'SM'
	};


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
		const passwords = new Password(this.oldPassword, this.newPassword);
		this.userService
			.updatePassword(this.user.username, passwords)
			.subscribe(
				data => {
					this.success = true;
					setTimeout(() => this.success = false, 3000);
					this.message = 'Password changed successfully!';
					this.clearFields();
				},
				error => {
					this.error = true;
					setTimeout(() => this.error = false, 3000);
					this.message = 'Wrong Password';
				}
			);
	}

	handleSavePasswordClick(): void {
		if (this.newPassword !== this.confirmNewPassword) {
			this.error = true;
			this.message = 'Passwords do not match';
			setTimeout(() => this.error = false, 3000);
			return;
		}
		try {
			this.savePassword();
		} catch (error) {
			console.log(error);
		}
	}

	clearFields(): void {
		this.oldPassword = undefined;
		this.newPassword = undefined;
		this.confirmNewPassword = undefined;
	}
}
