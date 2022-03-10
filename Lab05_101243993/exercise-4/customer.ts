export class Customer {
  private firstName: string;
  private lastName: string;
  private _age: number;

  constructor(fnm: string, lnm: string, age: number) {
    this.firstName = fnm;
    this.lastName = lnm;
    this._age = age;
  }

  public greeter() {
    console.log(`Hello ${this.firstName} ${this.lastName}`);
  }
  public getAge() {
    console.log(`Age is ${this._age}`);
  }
}

let customer = new Customer("John", "Smith", 20);
customer.greeter();
