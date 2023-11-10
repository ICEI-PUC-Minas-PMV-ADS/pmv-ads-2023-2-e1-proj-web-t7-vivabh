import { User } from '../model/User.js';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
	constructor() {
		this.users = JSON.parse(localStorage.getItem('users')) || [];
		this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
	}

	getCurrentUser() {
		return this.currentUser;
	}

	saveUsers() {
		localStorage.setItem('users', JSON.stringify(this.users));
	}

	saveCurrentUser() {
		localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
	}

	add(user) {
		const id = uuidv4();
		const newUser = new User(
			id,
			user.name,
			user.email,
			user.password,
			user.type
		);

		if (!newUser.validateRequiredFields()) return false;

		newUser.setPassword();

		this.users.push(newUser);
		this.saveUsers();
		return newUser;
	}

	getAll() {
		return this.users;
	}

	getByname(name) {
		return this.users.find((user) => user.name === name);
	}

	getByEmail(email) {
		return this.users.find((user) => user.email === email);
	}

	getById(id) {
		return this.users.find((user) => user.getId() === id);
	}

	updateCurrentUser() {
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));
		const user = this.getById(currentUser.id);

		localStorage.setItem('currentUser', user);
	}

	update(id, updatedUser) {
		const userToUpdate = this.getById(id);
		const fieldsToUpdate = ['name', 'email', 'password', 'type'];

		if (userToUpdate) {
			for (const field of fieldsToUpdate) {
				userToUpdate[field] = updatedUser[field] || userToUpdate[field];
			}

			this.saveUsers();
			this.updateCurrentUser();
		}
	}

	delete(id) {
		this.users = this.users.filter((user) => user.getId() !== id);
		this.saveUsers();
		this.updateCurrentUser();
	}
}

const userRepository = new UserRepository();

export { userRepository };
