import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { Password } from '../models/Password';
import { UserService } from '../../services/user.service';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})


export class ProfileComponent implements OnInit {
	user: User;
	updatedValues: User;
	passwords:Password;
	isChanged = false;

	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;

	ROLES = {
		ADMIN: 'ADMIN',
		HR: 'HR',
		SALESMAN: 'SM'
	};
	
 //	@ViewChild('updateModal') updateModal: any;


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

	/*showCloseUpdateModal(): void {
		const modal = this.updateModal.nativeElement;
		modal.classList.toggle('active');
	}

	handleEditClick(u: User): void {
		if (this.newPassword===this.confirmNewPassword){
		this.updatedValues = { ...u };
		}
		this.showCloseUpdateModal();
	}*/

	savePassword(): void {
		if (this.newPassword===this.confirmNewPassword){
		this.passwords=new Password(this.oldPassword,this.newPassword);
		this.userService
			.updatePassword(this.user.username, this.passwords)
			.subscribe();
		} else{// FEHLER}
		
	}
}
