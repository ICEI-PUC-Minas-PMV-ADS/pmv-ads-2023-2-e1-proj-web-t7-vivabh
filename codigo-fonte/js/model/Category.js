/**
 * Represents an Cateogry with various properties.
 *
 * @class
 */
export class Category {
	/**
	 * Create a new Categorie instance.
	 *
	 * @constructor
	 * @param {number} id - The unique identifier of the category.
	 * @param {string} name - The name of the categorie.
	 * @param {string} icon - The path to the icon asset.
	 */
	constructor(id, name, icon) {
		this.id = id;
		this.name = name;
		this.icon = icon;
	}

	/**
	 * Validates whether all required fields of the category are present.
	 *
	 * @returns {boolean} Returns true if all required fields are present, otherwise false.
	 */
	validateRequiredFields() {
		if (!this.name) return false;

		return true;
	}

	/**
	 * Get the unique identifier of the category.
	 *
	 * @returns {number} The event ID.
	 */
	getId() {
		return this.id;
	}

	/**
	 * Get the name of the category.
	 *
	 * @returns {string} The event name.
	 */
	getName() {
		return this.name;
	}
}
