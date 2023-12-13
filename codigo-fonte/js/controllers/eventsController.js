import { getWeekNumber, retryQuerySelector } from "../helpers.js";
import { categoryRepository } from "../repositories/categoriesRepository.js";
import { eventsRepository } from "../repositories/eventsRepository.js";
import { userRepository } from "../repositories/usersRepository.js";
import { v4 as uuidv4 } from "uuid";
import { componentsService } from "../services/ComponentsService.js";
import { fileService } from "../services/FileService.js";

export class EventsController {
  constructor() {
    this.eventsRepository = eventsRepository;
    this.categoriesRepository = categoryRepository;
    this.userRepository = userRepository;
    this.componentsService = componentsService;
    this.fileService = fileService;
    this.options = {};
  }

  async getEvents() {
    return this.eventsRepository.getAll();
  }

  async getByCategory(category) {
    return this.eventsRepository.getByCategory(category);
  }

  async getEventsByOwner(owner) {
    return this.eventsRepository.getByOwner(owner);
  }

  async getEvent(id) {
    return this.eventsRepository.get(id);
  }

  async createEvent(event) {
    const category = this.categoriesRepository.getByName(event.category);
    const owner = this.userRepository.getCurrentUser();
    const id = uuidv4();
    let newEvent = {
      ...event,
      category: category.name,
      owner,
      id,
    };

    newEvent = this.eventsRepository.add(newEvent);
    if (!newEvent) return false;

    return newEvent;
  }

  getIdFromQueryParams() {
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(currentURL.split("?")[1]);
    const id = urlParams.get("id");
    return id;
  }

  async updateEvent(event) {
    const id = this.getIdFromQueryParams();
    this.eventsRepository.update(id, event);
    return event;
  }

  async deleteEvent(id) {
    this.eventsRepository.delete(id);
    return id;
  }

  getCategories() {
    const categories = this.categoriesRepository.getAll();
    return categories.map((category) => category.name);
  }

  getClassifications() {
    return this.eventsRepository.getClassifications();
  }

  createOptions(selectName, data) {
    const options = componentsService.createOptionsComponent(data);
    retryQuerySelector(`select[name="${selectName}"]`, (select) => {
      select.innerHTML += options.join("");
    });
  }

  async handleFormSubmission(event, _form) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const description = document.querySelector(
      'textarea[name="description"]'
    ).value;
    const date = document.querySelector('input[name="date"]').value;
    const image = await this.fileService.returnImageFromFieldFile();
    const category = document.querySelector('select[name="category"]').value;
    const time = document.querySelector('input[name="time"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const quantity = document.querySelector('input[name="quantity"]').value;
    const classification = document.querySelector(
      'select[name="classification"]'
    ).value;

    const newEvent = {
      name,
      description,
      date,
      image,
      category,
      time,
      address,
      quantity,
      classification,
    };

    const result = await this.createEvent(newEvent);

    if (result) {
      alert("Evento criado com sucesso!");
      localStorage.removeItem("preview-image");
      window.location.href = "/admin";
      return;
    }

    alert("Preencha todos os campos!");
  }

  async handleEditFormSubmission(event, _form) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const description = document.querySelector(
      'textarea[name="description"]'
    ).value;
    const date = document.querySelector('input[name="date"]').value;
    const image = await this.fileService.returnImageFromFieldFile();
    const category = document.querySelector('select[name="category"]').value;
    const time = document.querySelector('input[name="time"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const quantity = document.querySelector('input[name="quantity"]').value;
    const classification = document.querySelector(
      'select[name="classification"]'
    ).value;

    const updatedEvent = {
      name,
      description,
      date,
      image,
      category,
      time,
      address,
      quantity,
      classification,
    };

    const result = await this.updateEvent(updatedEvent);

    if (result) {
      alert("Evento atualizado com sucesso!");
      localStorage.removeItem("preview-image");
      window.location.href = "/admin";
      return;
    }

    alert("Preencha todos os campos!");
  }

  async initNewEventForm() {
    retryQuerySelector("#new-event-form", async (form) => {
      form.addEventListener("submit", async (event) => {
        await this.handleFormSubmission(event, form);
      });
    });

    retryQuerySelector(
      "#new-event-form .image-container input[type=file]#image",
      (el) => {
        el.addEventListener("change", () => {
          this.fileService.previewImage();
        });
      }
    );

    const classifications = this.getClassifications();
    const categories = this.getCategories();

    this.createOptions("classification", classifications);
    this.createOptions("category", categories);
  }

  async getEventFromQueryParams() {
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(currentURL.split("?")[1]);
    const id = urlParams.get("id");
    const event = await this.getEvent(id);

    if (!event) {
      alert("Evento não encontrado!");
      window.location.href = "/eventos";
      return;
    }

    return event;
  }

  async populateEditForm() {
    const event = await this.getEventFromQueryParams();
    retryQuerySelector("#edit-event-form", (form) => {
      form.addEventListener("submit", async (event) => {
        await this.handleEditFormSubmission(event, form);
      });
    });

    retryQuerySelector(
      "#edit-event-form .image-container input[type=file]#image",
      (el) => {
        el.addEventListener("change", () => {
          this.fileService.previewImage(true);
        });
      }
    );

    const classifications = this.getClassifications();
    const categories = this.getCategories();

    this.createOptions("category", categories);
    this.createOptions("classification", classifications);
    retryQuerySelector("#edit-event-form", (form) => {
      form.name.value = event.name;
      form.description.value = event.description;
      form.date.value = event.date;
      form.category.value = event.category.name;
      form.time.value = event.time;
      form.address.value = event.address;
      form.quantity.value = event.quantity;
      form.classification.value = event.classification;
    });

    retryQuerySelector(
      "#edit-event-form .image-container #image-preview",
      (el) => {
        el.src = event.image;
      }
    );
  }

  getEventsFromThisMonth() {
    const events = this.eventsRepository.getAll();
    const today = new Date();
    const thisMonth = today.getMonth();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const eventMonth = eventDate.getMonth();
      return eventMonth === thisMonth;
    });
  }

  getEventsFromThisWeek() {
    const events = this.eventsRepository.getAll();
    const today = new Date();
    const currentWeekNumber = getWeekNumber(today);

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const eventWeekNumber = getWeekNumber(eventDate);

      return (
        eventWeekNumber === currentWeekNumber ||
        (eventWeekNumber === currentWeekNumber - 1 && today > eventDate)
      );
    });
  }

  populateFromThisMonth() {
    const events = this.getEventsFromThisMonth().slice(0, 6);

    retryQuerySelector("#eventsFromThisMonth", (element) => {
      this.populateEventsContainer(element, events);
    });
  }

  populateFromThisWeek() {
    const events = this.getEventsFromThisWeek().slice(0, 6);

    retryQuerySelector("#eventsFromThisWeek", (element) => {
      if (events && events.length > 0) {
        this.populateEventsContainer(element, events);
      }
    });
  }

  async getSuggestedEventsFromSameCategory(event) {
    const events = await this.getByCategory(event.category.name);
    return events.filter((item) => item.id !== event.id).slice(0, 3);
  }

  populateEventDetails() {
    retryQuerySelector("#eventDetails", async (element) => {
      element.innerHTML = "";
      const event = await this.getEventFromQueryParams();

      const content = componentsService.createEventDetailsComponent(event);

      element.innerHTML = content;

      const suggestedEvents = await this.getSuggestedEventsFromSameCategory(
        event
      );

      if (suggestedEvents.length === 0) return;

      element.appendChild(
        componentsService.buildSuggestedEvents(suggestedEvents)
      );
    });
  }

  async populateEventsContainer(element, events, isAdminPanel = false) {
    const fragment = componentsService.createEventsContainer(
      events,
      isAdminPanel
    );

    element.innerHTML = "";
    element.appendChild(fragment);
  }

  async populateEventsAdminPanel() {
    const events = await this.getEventsByOwner(
      this.userRepository.getCurrentUser()
    );
    retryQuerySelector("#admin-panel .events-cards", (element) => {
      this.populateEventsContainer(element, events, true);
    });
  }

  async populateEventsSearchContainer(filteredEvents = null) {
    retryQuerySelector("#eventsSearchContainer", async (element) => {
      const events = filteredEvents || (await this.getEvents());
      this.populateEventsContainer(element, events);
    });
  }

  async getFilteredEvents(options) {
    let events = await this.getEvents();
    if (!options) return events;

    if (options.category) {
      events = events.filter(
        (event) => event.category.name === options.category
      );
    }

    if (options.classification) {
      events = events.filter((event) => {
        const eventClassificationNumber =
          event.classification === "Livre"
            ? 0
            : parseInt(event.classification.split(" ")[0]);
        const optionChoosedByTheUserClassificationNumber =
          options.classification === "Livre"
            ? 0
            : parseInt(options.classification.split(" ")[0]);

        return (
          eventClassificationNumber <=
          optionChoosedByTheUserClassificationNumber
        );
      });
    }
    return events;
  }

  handleFilterChange() {
    const filterElements = [
      { id: "#filterCategory", key: "category" },
      { id: "#filterClassification", key: "classification" },
    ];

    filterElements.forEach(({ id, key }) => {
      retryQuerySelector(id, (element) => {
        element.addEventListener("change", async () => {
          this.options = {
            ...this.options,
            [key]: element.value,
          };
          await this.getFilteredEventsAndPopulateContainer();
        });
      });
    });
  }

  async getFilteredEventsAndPopulateContainer() {
    const events = await this.getFilteredEvents(this.options);
    this.populateEventsSearchContainer(events);
  }

  async filterEventsWithQueryParams() {
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(currentURL.split("?")[1]);
    const category = urlParams.get("categoria");

    if (category) {
      retryQuerySelector("#filterCategory", (element) => {
        element.value = category;
      });

      this.options = {
        ...this.options,
        category,
      };

      await this.getFilteredEventsAndPopulateContainer();
    }
  }
}

const eventsController = new EventsController();

export { eventsController };
