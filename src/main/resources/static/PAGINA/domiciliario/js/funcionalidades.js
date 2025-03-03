let orders = [];
const orderModal = new bootstrap.Modal(document.getElementById("orderModal"));

// Renderizar tabla
function renderTable() {
  const tableBody = document.getElementById("orderTableBody");
  tableBody.innerHTML = "";

  orders.forEach((order, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${order.name}</td>
        <td>${order.email}</td>
        <td>${order.status}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editOrder(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteOrder(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Guardar pedido
function saveOrder(event) {
  event.preventDefault();
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const status = document.getElementById("orderStatus").value;
  const currentIndex = document.getElementById("currentOrderIndex").value;

  if (currentIndex === "") {
    orders.push({ name, email, status });
  } else {
    orders[currentIndex] = { name, email, status };
  }

  orderModal.hide();
  renderTable();
}

// Abrir modal para agregar pedido
function openAddModal() {
  document.getElementById("orderForm").reset();
  document.getElementById("currentOrderIndex").value = "";
  orderModal.show();
}

// Editar pedido
function editOrder(index) {
  const order = orders[index];
  document.getElementById("customerName").value = order.name;
  document.getElementById("customerEmail").value = order.email;
  document.getElementById("orderStatus").value = order.status;
  document.getElementById("currentOrderIndex").value = index;
  orderModal.show();
}

// Eliminar pedido con confirmación
function deleteOrder(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
    orders.splice(index, 1);
    renderTable();
  }
}

// Descargar PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf; // Aseguramos que jsPDF esté disponible
  const doc = new jsPDF();

  // Títulos de la tabla
  const tableColumn = ["#", "Cliente", "Correo Electrónico", "Estado"];
  const tableRows = orders.map((order, index) => [
    index + 1, order.name, order.email, order.status
  ]);

  // Agregamos la tabla al PDF
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    theme: 'grid'
  });

  // Guardamos el PDF
  doc.save("pedidos.pdf");
}

// Descargar Excel
function downloadExcel() {
  const ws = XLSX.utils.json_to_sheet(
    orders.map((order, index) => ({
      "#": index + 1,
      Cliente: order.name,
      Email: order.email,
      Estado: order.status,
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
  XLSX.writeFile(wb, "pedidos.xlsx");
}

// Imprimir tabla
function printTable() {
  const printWindow = window.open("", "", "width=800,height=600");
  const tableHTML = document.getElementById("orderTable").outerHTML;
  printWindow.document.write(`
    <html>
      <head><title>Imprimir Pedidos</title></head>
      <body>
        <h1>Lista de Pedidos</h1>
        ${tableHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// Inicializar
renderTable();
