import Company2 from "./Company.js";
import Entity2 from "./Entity.js";
export class ProductLabels extends Entity2 {
  constructor() {
    super(...arguments);
    this.description = void 0;
    this.quantity = void 0;
    this.price = void 0;
    this.taxRate = void 0;
    this.sum = void 0;
    this.vat_sum = void 0;
  }
}
export class InvoiceLabels extends Entity2 {
  constructor() {
    super(...arguments);
    this.title = void 0;
    this.date = void 0;
    this.dueDate = void 0;
    this.company = void 0;
    this.client = void 0;
    this.products = new ProductLabels();
    this.tax = void 0;
    this.subTotal = void 0;
    this.total = void 0;
    this.notes = void 0;
    this.terms = void 0;
  }
  setProducts(productLabels) {
    this.products.assign(productLabels);
  }
}
export default class Invoice extends Entity2 {
  constructor(hash, date, dueDate, country, currency, locale, dateformat, labels) {
    super();
    this.hash = void 0;
    this.fileId = void 0;
    this.logo = void 0;
    this.labels = void 0;
    this.locale = void 0;
    this.withVAT = false;
    this.title = void 0;
    this.name = void 0;
    this.accountNumber = void 0;
    this.date = void 0;
    this.dueDate = void 0;
    this.products = [];
    this.currency = void 0;
    this.notes = "";
    this.terms = "";
    this.paymentMethod = "";
    this.hash = hash;
    this.date = date;
    this.dueDate = dueDate;
    this.locale = locale;
    this.currency = currency;
    this.dateFormat = dateformat;
    this.labels = labels;
    this.company = new Company2(country);
    this.client = new Company2(country);
  }
  setDate(date) {
    if (typeof date === "undefined") {
      throw new Error("Date must be specified");
    }
    if (typeof date === "string") {
      this.date = new Date(date);
    }
    if (!date) {
      date = new Date();
    }
    this.date = date;
  }
  setDueDate(date) {
    if (typeof date === "undefined") {
      throw new Error("Date must be specified");
    }
    if (typeof date === "string") {
      this.dueDate = new Date(date);
    }
    if (!date) {
      date = new Date();
    }
    this.dueDate = date;
  }
}
