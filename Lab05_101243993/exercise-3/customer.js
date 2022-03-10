var Customer = /** @class */ (function () {
    function Customer(fnm, lnm) {
        this.firstName = fnm;
        this.lastName = lnm;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    return Customer;
}());
var customer = new Customer("John", "Smith");
customer.greeter();
