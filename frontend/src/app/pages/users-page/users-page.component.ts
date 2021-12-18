import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
	selector: 'app-users-page',
	templateUrl: './users-page.component.html',
	styleUrls: [ './users-page.component.css' ]
})
export class UsersPageComponent implements OnInit {

	users: User[] = [];

	activeUser: User; // the clicked salesman needed for the modal
	updatedValues: User;

	@ViewChild(MatTable) table: MatTable<User>;
	displayedColumns: string[] = [ 'username', 'firstname', 'lastname', 'email', 'role', 'action' ];

	newUser: User;
	hasError = false;

	@ViewChild('deleteModal') deleteModal: any;
	@ViewChild('updateModal') updateModal: any;


	constructor(private usersService: UserService) {
	}

	ngOnInit(): void {
		this.getUser();
		this.newUser = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
	}

	getUser(): void {
		this.usersService
			.getUsers()
			.subscribe(data => {
				this.users = data;
			});
	}

	createUser(): Promise<void> {
		if (!this.newUser.username || !this.newUser.firstname || !this.newUser.lastname) {
			this.hasError = true;
			return;
		}

		this.usersService
			.createUser(this.newUser)
			.subscribe(() => {
				this.getUser();
				this.users.push(this.newUser);
				this.table.renderRows();
				this.resetFields();
			});
	}

	deleteUser(username: string): void {
		this.usersService
			.deleteUser(username)
			.subscribe(() => {
				this.users = this.users.filter((s) => s.username !== username);
			});
	}

	updateUser(username: string, updatedValues: User): void {
		this.usersService
			.updateUser(username, updatedValues)
			.subscribe((data) => {
				this.users = this.users.map((s) => s.username === username ? data : s);
				this.getUser();
			});

	}

	resetFields(): void {
		this.newUser = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
		this.hasError = false;
	}

	showCloseDeleteModal(): void {
		const modal = this.deleteModal.nativeElement;
		modal.classList.toggle('active');
	}

	showCloseUpdateModal(): void {
		const modal = this.updateModal.nativeElement;
		modal.classList.toggle('active');
	}

	handleDeleteClick(u: User): void {
		this.activeUser = { ...u };
		this.showCloseDeleteModal();
	}

	handleEditClick(u: User): void {
		this.activeUser = { ...u };
		this.updatedValues = { ...u };
		this.showCloseUpdateModal();
	}
}

