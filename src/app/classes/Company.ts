import Entity from "./Entity";

export interface CompanyInterface {
    name: string
    address: string
    address2: string
    country: string
    cin: string
    tin: string
}

export default class Company extends Entity implements CompanyInterface {

  name = '';
  address = '';
  address2 = '';
  country;
  cin = '';
  tin = '';

  constructor(country: string) {
  	super();
    this.country = country;
  }

}
