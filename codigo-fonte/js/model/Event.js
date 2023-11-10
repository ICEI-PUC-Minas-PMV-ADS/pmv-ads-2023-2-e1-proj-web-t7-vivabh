import { Category } from './Category';
import { User } from './User';

/**
 * Represents an event with various properties.
 *
 * @class
 */
export class Event {
	/**
	 * Create a new Event instance.
	 *
	 * @constructor
	 * @param {number} id - The unique identifier of the event.
	 * @param {string} name - The name of the event.
	 * @param {string} description - A description of the event.
	 * @param {string} date - The date of the event.
	 * @param {string} time - The time of the event.
	 * @param {string} address - The address of the event.
	 * @param {string} image - The URL of the event image.
	 * @param {Category} category - The category of the event.
	 * @param {string} classification - The classification of the event.
	 * @param {number} quantity - The quantity of tickets available for the event.
	 * @param {User} owner - The owner of the event.
	 */
	constructor(
		id,
		name,
		description,
		date,
		time,
		address,
		image,
		category,
		classification,
		quantity,
		owner
	) {
		this.id = id;
		this.name = name;
		this.category = category;
		this.description = description;
		this.date = date;
		this.time = time;
		this.address = address;
		this.image = image;
		this.classification = classification;
		this.quantity = quantity;
		this.owner = owner;
	}

	/**
	 * Validates whether all required fields of the event are present.
	 *
	 * @returns {boolean} Returns true if all required fields are present, otherwise false.
	 */
	validateRequiredFields() {
		if (
			!this.name ||
			!this.description ||
			!this.date ||
			!this.time ||
			!this.address ||
			!this.image ||
			!this.category ||
			!this.classification ||
			!this.quantity ||
			!this.owner
		) {
			return false;
		}
		return true;
	}

	/**
	 * Get the unique identifier of the event.
	 *
	 * @returns {number} The event ID.
	 */
	getId() {
		return this.id;
	}

	/**
	 * Get the name of the event.
	 *
	 * @returns {string} The event name.
	 */
	getName() {
		return this.name;
	}

	/**
	 * Get the description of the event.
	 *
	 * @returns {string} The event description.
	 */
	getDescription() {
		return this.description;
	}

	/**
	 * Get the date of the event.
	 *
	 * @returns {string} The event date.
	 */
	getDate() {
		return this.date;
	}

	/**
	 * Get the time of the event.
	 *
	 * @returns {string} The event time.
	 */
	getTime() {
		return this.time;
	}

	/**
	 * Get the address of the event.
	 *
	 * @returns {string} The event address.
	 */
	getAddress() {
		return this.address;
	}

	/**
	 * Get the URL of the event image.
	 *
	 * @returns {string} The event image URL.
	 */
	getImage() {
		return this.image;
	}

	/**
	 * Get the category of the event.
	 *
	 * @returns {string} The event category.
	 */
	getCategory() {
		return this.category;
	}

	/**
	 * Get the classification of the event.
	 *
	 * @returns {string} The event classification.
	 */
	getClassification() {
		return this.classification;
	}

	/**
	 * Get the quantity of tickets available for the event.
	 *
	 * @returns {number} The quantity of tickets.
	 */
	getQuantity() {
		return this.quantity;
	}
}
