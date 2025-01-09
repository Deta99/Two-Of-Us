const orderItemsTable = document.querySelector("#order-items tbody");
const subtotalInput = document.getElementById("subtotal");
const freightInput = document.getElementById("freight");
const totalInput = document.getElementById("total");

document.getElementById("add-item").addEventListener("click", function () {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Product Name"></td>
        <td><input type="number" placeholder="Unit Price" class="unit-price"></td>
        <td><input type="number" placeholder="Quantity" class="quantity"></td>
        <td><input type="number" placeholder="Discount (%)" class="discount"></td>
        <td><input type="text" placeholder="Extended Price" class="extended-price" readonly></td>
        <td><button type="button" class="remove-item">Remove</button></td>
    `;

    orderItemsTable.appendChild(row);

    row.querySelector(".remove-item").addEventListener("click", function () {
        row.remove();
        calculateTotals();
    });

    row.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", calculateTotals);
    });
});

function calculateTotals() {
    let subtotal = 0;
    document.querySelectorAll("#order-items tbody tr").forEach(row => {
        const unitPrice = parseFloat(row.querySelector(".unit-price").value) || 0;
        const quantity = parseFloat(row.querySelector(".quantity").value) || 0;
        const discount = parseFloat(row.querySelector(".discount").value) || 0;

        const extendedPrice = unitPrice * quantity * (1 - discount / 100);
        row.querySelector(".extended-price").value = extendedPrice.toFixed(2);
        subtotal += extendedPrice;
    });

    const freight = 38.28; // Fixed value for demonstration
    const total = subtotal + freight;

    subtotalInput.value = subtotal.toFixed(2);
    freightInput.value = freight.toFixed(2);
    totalInput.value = total.toFixed(2);
}

document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Order saved!");
});
