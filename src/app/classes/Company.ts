
export interface CompanyInterface {
    name: string
    address: string
    address2: string
    country: string
    cin: string
    tin: string
}

export default class Company implements CompanyInterface {

  name = '';
  address = '';
  address2 = '';
  country = '';
  cin = '';
  tin = '';

  constructor(country: string) {
    this.country = country;
  }

}
