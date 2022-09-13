'use strict';

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 20;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

class EV extends Car {
  #charge;
  constructor(make, speed, battery) {
    super(make, speed);
    this.#charge = battery;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }

  chargeBattery(charge) {
    this.#charge = charge;
    return this;
  }
}

const tesla = new EV('Tesla', 120, 23);

// console.log(tesla);
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   this.battery -= 1;
//   console.log(`Tesla going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`Tesla going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, battery) {
//   Car.call(this, make, speed);
//   this.battery = battery;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.battery = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.battery -= 1;
//   console.log(
//     `Tesla going at ${this.speed} km/h, with a charge of ${this.battery}%`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);

// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(90);

// tesla.accelerate();

// const PersonProto = {
//   get age() {
//     console.log(2022 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstname, birthYear, course) {
//   PersonProto.init.call(this, firstname, birthYear);
//   this.course = course;
// };

// const jay = Object.create(StudentProto);
// jay.init('Alfred Jay', 1999, 'Information Technology');

// Public fields
// Private fields
// Public methods
// Private methods

// class Account {
//   // Public fields (instances)
//   locale = navigator.language;

//   // Private fields
//   #movements = [];
//   #pin = null;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;

//     this.#pin = pin;
//   }

//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }

//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }

//   #approveLoan(val) {
//     return true;
//   }

//   requreLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//     }

//     return this;
//   }
// }

// const Alicred = new Account('Alicred', 'US', '092025');

// Alicred.deposit(300).deposit(300).withdraw(800).requreLoan(850).withdraw(1000);

// console.log(Alicred);
