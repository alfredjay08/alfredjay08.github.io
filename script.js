/*function newBtn(classes, text) {
  let button = document.createElement("button");
  let element = document.getElementById("div1");
  let classLength = classes.length;

  button.innerHTML = text;
  for(let i = 0; i < classLength; i++) {
    button.classList.add(classes[i]);
  }

  element.appendChild(button);
}

newBtn(["btn", "btn-success"], "Save Form");
newBtn(["btn", "btn-danger"], "Delete Form");*/


class Car {
  constructor(brand) {
    this._carname = brand;
  }
  get carname() {
    return this._carname;
  }
  set carname(x) {
    this._carname = x;
  }
}

let myCar = new Car("Ford");
myCar._carname = "Que";
document.getElementById("div1").innerHTML = myCar.carname;