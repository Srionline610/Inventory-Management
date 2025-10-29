document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inventoryForm");
  const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
  let selectedRow = null;
  let nextId = 1;

  // ✅ Load existing data from Local Storage
  let inventory = JSON.parse(localStorage.getItem("inventoryData")) || [];
  renderTable();

  // ✅ Add Item
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const supplier = document.getElementById("supplier").value.trim();
    const location = document.getElementById("location").value.trim();

    if (!name || !category || !quantity || !price) {
      alert("Please fill in all required fields!");
      return;
    }

    if (selectedRow == null) {
      const newItem = {
        id: nextId++,
        name,
        category,
        quantity,
        price,
        supplier,
        location
      };
      inventory.push(newItem);
    } else {
      const id = parseInt(selectedRow.cells[0].textContent);
      const item = inventory.find((i) => i.id === id);
      item.name = name;
      item.category = category;
      item.quantity = quantity;
      item.price = price;
      item.supplier = supplier;
      item.location = location;
      selectedRow = null;
    }

    saveToLocal();
    renderTable();
    clearForm();
  });

  // ✅ Select row
  table.addEventListener("click", function (e) {
    const target = e.target.closest("tr");
    if (target) {
      selectedRow = target;
      document.getElementById("name").value = target.cells[1].textContent;
      document.getElementById("category").value = target.cells[2].textContent;
      document.getElementById("quantity").value = target.cells[3].textContent;
      document.getElementById("price").value = target.cells[4].textContent;
      document.getElementById("supplier").value = target.cells[5].textContent;
      document.getElementById("location").value = target.cells[6].textContent;
    }
  });

  // ✅ Update
  document.querySelector(".update").addEventListener("click", function () {
    if (selectedRow) {
      const id = parseInt(selectedRow.cells[0].textContent);
      const item = inventory.find((i) => i.id === id);

      item.name = document.getElementById("name").value;
      item.category = document.getElementById("category").value;
      item.quantity = document.getElementById("quantity").value;
      item.price = document.getElementById("price").value;
      item.supplier = document.getElementById("supplier").value;
      item.location = document.getElementById("location").value;

      saveToLocal();
      renderTable();
      clearForm();
      selectedRow = null;
    } else {
      alert("Please select a row to update!");
    }
  });

  // ✅ Delete
  document.querySelector(".delete").addEventListener("click", function () {
    if (selectedRow) {
      const id = parseInt(selectedRow.cells[0].textContent);
      inventory = inventory.filter((item) => item.id !== id);
      saveToLocal();
      renderTable();
      clearForm();
      selectedRow = null;
    } else {
      alert("Please select a row to delete!");
    }
  });

  // ✅ Clear form
  document.querySelector(".clear").addEventListener("click", function () {
    clearForm();
    selectedRow = null;
  });

  // ✅ Render table from inventory
  function renderTable() {
    table.innerHTML = "";
    inventory.forEach((item) => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.supplier}</td>
        <td>${item.location}</td>
      `;
    });
  }

  // ✅ Save to Local Storage
  function saveToLocal() {
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
  }

  // ✅ Clear Form
  function clearForm() {
    form.reset();
  }
});
