var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["Nombre"] = document.getElementById("Nombre").value;
    formData["direccion"] = document.getElementById("direccion").value;
    formData["info"] = document.getElementById("info").value;
    formData["numerodocumento"] = document.getElementById("numerodocumento").value;
    formData["categoria"] = document.getElementById("categoria").value;
    formData["condicion"] = document.getElementById("condicion").value;
    formData["historial"] = document.getElementById("historial").value;
    formData["comentarios"] = document.getElementById("comentarios").value;
    formData["estado"] = document.getElementById("estado").value;
    formData["foto"] = document.getElementById("foto").value;
    return formData;
}

//Insertar Tabla
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.Nombre;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.direccion;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.info;
        cell5 = newRow.insertCell(4);
		cell5.innerHTML = data.numerodocumento;
        cell6 = newRow.insertCell(5);
		cell6.innerHTML = data.categoria;
        cell7 = newRow.insertCell(6);
		cell7.innerHTML = data.condicion;
        cell8 = newRow.insertCell(7);
		cell8.innerHTML = data.historial;
        cell9 = newRow.insertCell(8);
		cell9.innerHTML = data.comentarios;
        cell10 = newRow.insertCell(9);
		cell10.innerHTML = data.estado;
        cell11 = newRow.insertCell(10);
		cell11.innerHTML = data.foto;
        cell12 = newRow.insertCell(11);
        cell12.innerHTML = `<button onClick="onEdit(this)">Editar</button> <button onClick="onDelete(this)">Eliminar</button>`;
}

//Editar Tabla
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Nombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("direccion").value = selectedRow.cells[2].innerHTML;
    document.getElementById("info").value = selectedRow.cells[3].innerHTML;
    document.getElementById("numerodocumento").value = selectedRow.cells[4].innerHTML;
    document.getElementById("categoria").value = selectedRow.cells[5].innerHTML;
    document.getElementById("condicion").value = selectedRow.cells[6].innerHTML;
    document.getElementById("historial").value = selectedRow.cells[7].innerHTML;
    document.getElementById("comentarios").value = selectedRow.cells[8].innerHTML;
    document.getElementById("estado").value = selectedRow.cells[9].innerHTML;
    document.getElementById("foto").value = selectedRow.cells[10].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.Nombre;
    selectedRow.cells[2].innerHTML = formData.direccion;
    selectedRow.cells[3].innerHTML = formData.info;
    selectedRow.cells[4].innerHTML = formData.numerodocumento;
    selectedRow.cells[5].innerHTML = formData.categoria;
    selectedRow.cells[6].innerHTML = formData.condicion;
    selectedRow.cells[7].innerHTML = formData.historial;
    selectedRow.cells[8].innerHTML = formData.comentarios;
    selectedRow.cells[9].innerHTML = formData.estado;
    selectedRow.cells[10].innerHTML = formData.foto;
}

//Eliminar Tabla
function onDelete(td) {
    if (confirm('Quieres eliminar este proveedor?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Borrar tabla
function resetForm() {
    document.getElementById("id").value = '';
    document.getElementById("Nombre").value = '';
    document.getElementById("direccion").value = '';
    document.getElementById("info").value = '';
    document.getElementById("numerodocumento").value = '';
    document.getElementById("categoria").value = '';
    document.getElementById("condicion").value = '';
    document.getElementById("historial").value = '';
    document.getElementById("comentarios").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("foto").value = '';
    selectedRow = null;
}