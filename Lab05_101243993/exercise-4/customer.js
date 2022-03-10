"use strict";
exports.__esModule = true;
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(fnm, lnm, age) {
        this.firstName = fnm;
        this.lastName = lnm;
        this._age = age;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    Customer.prototype.getAge = function () {
        console.log("Age is ".concat(this._age));
    };
    return Customer;
}());
exports.Customer = Customer;
var customer = new Customer("John", "Smith", 20);
customer.greeter();
customer.getAge();
