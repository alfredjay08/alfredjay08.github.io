var Customer = [
    {
      name: "Alfred Jay V. Ngujo",
      age: "22",
      mobile: "09519531593",
      address: "Puerto Princesa City"
    },
    {
      name: "Erica C. Belinario",
      age: "22",
      mobile: "09554327293",
      address: "El Nido, Palawan"
    },
    {
      name: "Jan Albert Villarito",
      age: "19",
      mobile: "09186957893",
      address: "Puerto Princesa City"
    },
    {
      name: "John Lemar Torridondo",
      age: "20",
      mobile: "09096789009",
      address: "Barangay ng mga Mangingisda"
    },
    {
      name: "James Smith",
      age: "32",
      mobile: "+432 4931 029",
      address: "United States"
    }
  ];

  function loadCustomer() {
    let tbodyHtml = ``;
    for(var i = 0; i < Customer.length; i++) {
      tbodyHtml += `
        <tr>
          <td>
            ${Customer[i].name}
          </td>
          <td>${Customer[i].age}</td>
          <td>${Customer[i].mobile}</td>
          <td>${Customer[i].address}</td>
          <td>
            <button class="btn btn-success" type="button">Edit <span>Edit Customer</span></button>
            <button class="btn btn-danger" type="button">Delete <span>Delete Customer</span></button>
          </td>
        </tr>
      `;
    }

    document.getElementById("customer-table").getElementsByTagName("tbody")[0].innerHTML = tbodyHtml;
  }

  loadCustomer();