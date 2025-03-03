// Datos iniciales
let pets = [
    { name: "Rex", breed: "Labrador", size: "Grande", status: "Pendiente" },
    { name: "Luna", breed: "Beagle", size: "Pequeño", status: "Hecho" },
    { name: "Max", breed: "Pastor Alemán", size: "Grande", status: "Pendiente" },
  ];
  const rowsPerPage = 5; // Filas por página
  let currentPage = 1;
  
  // Instancia del modal de Bootstrap
  const petModal = new bootstrap.Modal(document.getElementById("petModal"));
  
  // Renderizar tabla y paginación
  function renderTable() {
    const table = document.getElementById("petTable");
    table.innerHTML = "";
  
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedPets = pets.slice(startIndex, startIndex + rowsPerPage);
  
    paginatedPets.forEach((pet, index) => {
      const row = `<tr>
        <td>${startIndex + index + 1}</td>
        <td>${pet.name}</td>
        <td>${pet.breed}</td>
        <td>${pet.size}</td>
        <td>${pet.status}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="openEditModal(${startIndex + index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deletePet(${startIndex + index})">Eliminar</button>
        </td>
      </tr>`;
      table.innerHTML += row;
    });
  
    renderPagination();
  }
  
  // Buscar mascotas
  function filterTable() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredPets = pets.filter(pet =>
      pet.name.toLowerCase().includes(searchInput) ||
      pet.breed.toLowerCase().includes(searchInput) ||
      pet.size.toLowerCase().includes(searchInput) ||
      pet.status.toLowerCase().includes(searchInput)
    );
  
    const table = document.getElementById("petTable");
    table.innerHTML = "";
  
    filteredPets.forEach((pet, index) => {
      const row = `<tr>
        <td>${index + 1}</td>
        <td>${pet.name}</td>
        <td>${pet.breed}</td>
        <td>${pet.size}</td>
        <td>${pet.status}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="openEditModal(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deletePet(${index})">Eliminar</button>
        </td>
      </tr>`;
      table.innerHTML += row;
    });
  }
  
  // Modal: Agregar mascota
  function openAddModal() {
    document.getElementById("petForm").reset();
    document.getElementById("petModalLabel").innerText = "Agregar Mascota";
    document.getElementById("petIndex").value = "";
    petModal.show();
  }
  
  // Modal: Editar mascota
  function openEditModal(index) {
    const pet = pets[index];
    document.getElementById("petName").value = pet.name;
    document.getElementById("petBreed").value = pet.breed;
    document.getElementById("petSize").value = pet.size;
    document.getElementById("petStatus").value = pet.status;
    document.getElementById("petIndex").value = index;
    document.getElementById("petModalLabel").innerText = "Editar Mascota";
    petModal.show();
  }
  
  // Guardar mascota (Agregar o Editar)
  function savePet() {
    const name = document.getElementById("petName").value;
    const breed = document.getElementById("petBreed").value;
    const size = document.getElementById("petSize").value;
    const status = document.getElementById("petStatus").value;
    const index = document.getElementById("petIndex").value;
  
    if (index === "") {
      pets.push({ name, breed, size, status });
    } else {
      pets[index] = { name, breed, size, status };
    }
  
    petModal.hide(); // Cerrar modal
    renderTable(); // Actualizar la tabla
  }
  
  // Eliminar mascota
  function deletePet(index) {
    if (confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
      pets.splice(index, 1);
      renderTable();
    }
  }
  
  // Paginación
  function renderPagination() {
    const totalPages = Math.ceil(pets.length / rowsPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
  
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === currentPage ? "active" : "";
      const pageItem = `<li class="page-item ${activeClass}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
      pagination.innerHTML += pageItem;
    }
  }
  
  function changePage(page) {
    currentPage = page;
    renderTable();
  }

  // Exportar a Excel
function exportToExcel() {
  const table = document.getElementById("petsTable");
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Mascotas" });
  XLSX.writeFile(workbook, "Reporte_Mascotas.xlsx");
}

// Exportar a PDF
async function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Reporte de Mascotas", 14, 20);

  // Crear tabla a partir de los datos
  const table = document.getElementById("petsTable");
  const rows = [];
  table.querySelectorAll("tr").forEach((tr, i) => {
    const row = Array.from(tr.children).map(td => td.innerText);
    rows.push(row);
  });

  // Dibujar tabla en PDF
  doc.autoTable({
    head: [rows[0]], // Encabezados
    body: rows.slice(1), // Datos
    startY: 30,
  });

  doc.save("Reporte_Mascotas.pdf");
}
  
  // Inicializar
  document.addEventListener("DOMContentLoaded", () => {
    renderTable();
  });
  