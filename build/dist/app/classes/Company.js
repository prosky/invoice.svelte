import Entity2 from "./Entity.js";
export default class Company extends Entity2 {
  constructor(country) {
    super();
    this.name = "";
    this.address = "";
    this.address2 = "";
    this.cin = "";
    this.tin = "";
    this.country = country;
  }
}
