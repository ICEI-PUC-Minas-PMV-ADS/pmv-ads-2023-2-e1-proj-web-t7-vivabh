import bcrypt from 'bcryptjs';
/**
 * Represents a User with various properties.
 *
 * @class
 */
export class User {
	/**
	 * Create a new User instance.
	 *
	 * @constructor
	 * @param {number} id - The unique identifier of the user.
	 * @param {string} name - The name of the user.
	 * @param {string} email - The email address of the user.
	 * @param {string} password - The hashed password of the user.
	 * @param {string} type - The type of the user (admin or default).
	 */
	constructor(id, name, email, password, type) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.type = type;
	}

	/**
	 * Validates whether all required fields of the user are present.
	 *
	 * @returns {boolean} Returns true if all required fields are present, otherwise false.
	 */
	validateRequiredFields() {
		if (!this.name || !this.email || !this.password || !this.type) {
			return false;
		}

		return true;
	}

	/**
	 * Get the unique identifier of the user.
	 *
	 * @returns {number} The user ID.
	 */
	getId() {
		return this.id;
	}

	/**
	 * Get the name of the user.
	 *
	 * @returns {string} The name.
	 */
	getname() {
		return this.name;
	}

	/**
	 * Get the email address of the user.
	 *
	 * @returns {string} The email address.
	 */
	getEmail() {
		return this.email;
	}

	/**
	 * Get the user type (admin or default).
	 *
	 * @returns {string} The user type.
	 */
	getType() {
		return this.type;
	}

	/**
	 * Set the user type (admin or default).
	 *
	 * @param {string} type - The type to set for the user.
	 */
	setType(type) {
		this.type = type;
	}

	/**
	 * Set the hashed password for the user using bcryptjs.
	 *
	 * @param {string} password - The plain text password to hash and set.
	 */
	setPassword() {
		const saltRounds = 10; // You can adjust the number of salt rounds for security
		this.password = bcrypt.hashSync(this.password, saltRounds);
	}
}
