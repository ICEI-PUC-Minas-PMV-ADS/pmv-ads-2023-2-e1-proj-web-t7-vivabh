import { retryQuerySelector } from '../helpers.js';
import { userRepository } from '../repositories/usersRepository.js';
import bcrypt from 'bcryptjs';

class UserController {
	constructor() {
		this.userRepository = userRepository;
	}

	getAllUsers() {
		return this.userRepository.getAll();
	}

	getUserById(id) {
		return this.userRepository.getById(id);
	}

	getUserByEmail(email) {
		return this.userRepository.getByEmail(email);
	}

	getUserByname(name) {
		return this.userRepository.getByname(name);
	}

	addUser(user) {
		if (!user.type) {
			user.type = 'default';
		}

		return this.userRepository.add(user);
	}

	updateUser(id, updatedUser) {
		return this.userRepository.update(id, updatedUser);
	}

	deleteUser(id) {
		return this.userRepository.delete(id);
	}
	checkPassword(password, foundedUserPassword) {
		return bcrypt.compareSync(password, foundedUserPassword);
	}

	handleFormSubmit(form, event) {
		event.preventDefault();

		const formData = new FormData(form);
		const user = Object.fromEntries(formData);

		if (user.password !== user.passwordConfirmation) {
			alert('Senhas não conferem');
			return;
		}

		if (user.id) {
			if (this.updateUser(user.id, user)) {
				alert('Usuário atualizado com sucesso!');
				window.location.href = '/admin';
			}
		}

		if (this.addUser(user)) {
			alert('Usuário criado com sucesso!');
			window.location.href = '/login';
		}
	}

	handleLogin(form, event) {
		event.preventDefault();

		const formData = new FormData(form);
		const user = Object.fromEntries(formData);

		const userFound = this.getUserByEmail(user.email);

		if (!userFound) {
			alert('Usuário não encontrado');
			return;
		}

		if (!this.checkPassword(user.password, userFound.password)) {
			alert('Senha incorreta');
			return;
		}

		localStorage.setItem('currentUser', JSON.stringify(userFound));
		alert('Login realizado com sucesso!');
		window.location.href = '/admin';
	}

	initForm() {
		retryQuerySelector('#formRegister', (form) => {
			form.addEventListener('submit', (e) => this.handleFormSubmit(form, e));
		});
	}

	initLoginForm() {
		retryQuerySelector('#formLogin', (form) => {
			form.addEventListener('submit', (e) => this.handleLogin(form, e));
		});
	}
}

const userController = new UserController();

export { userController };
