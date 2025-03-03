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
    formData["tipo"] = document.getElementById("tipo").value;
    formData["numerodocumento"] = document.getElementById("numerodocumento").value;
    formData["numero"] = document.getElementById("numero").value;
    formData["correo"] = document.getElementById("correo").value;
    formData["direccion"] = document.getElementById("direccion").value;
    formData["edad"] = document.getElementById("edad").value;
    formData["fecha"] = document.getElementById("fecha").value;
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
		cell3.innerHTML = data.tipo;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.numerodocumento;
    cell5 = newRow.insertCell(4);
		cell5.innerHTML = data.numero;
        cell6 = newRow.insertCell(5);
		cell6.innerHTML = data.correo;
        cell7= newRow.insertCell(6);
		cell7.innerHTML = data.direccion;
        cell8 = newRow.insertCell(7);
		cell8.innerHTML = data.edad;
        cell9 = newRow.insertCell(8);
		cell9.innerHTML = data.fecha;
        cell10 = newRow.insertCell(9);
		cell10.innerHTML = data.foto;
        cell11 = newRow.insertCell(10);
        cell11.innerHTML = `<button onClick="onEdit(this)">Editar</button> <button onClick="onDelete(this)">Eliminar</button>`;
}

//Editar Tabla
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Nombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("tipo").value = selectedRow.cells[2].innerHTML;
    document.getElementById("numerodocumento").value = selectedRow.cells[3].innerHTML;
    document.getElementById("numero").value = selectedRow.cells[4].innerHTML;
    document.getElementById("correo").value = selectedRow.cells[5].innerHTML;
    document.getElementById("direccion").value = selectedRow.cells[6].innerHTML;
    document.getElementById("edad").value = selectedRow.cells[7].innerHTML;
    document.getElementById("fecha").value = selectedRow.cells[8].innerHTML;
    document.getElementById("foto").value = selectedRow.cells[9].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.Nombre;
    selectedRow.cells[2].innerHTML = formData.tipo;
    selectedRow.cells[3].innerHTML = formData.numerodocumento;
    selectedRow.cells[4].innerHTML = formData.numero;
    selectedRow.cells[5].innerHTML = formData.correo;
    selectedRow.cells[6].innerHTML = formData.dirrecion;
    selectedRow.cells[7].innerHTML = formData.edad;
    selectedRow.cells[8].innerHTML = formData.fecha;
    selectedRow.cells[9].innerHTML = formData.foto;
}

//Eliminar Tabla
function onDelete(td) {
    if (confirm('Quieres eliminar esta persona?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Borrar tabla
function resetForm() {
    document.getElementById("id").value = '';
    document.getElementById("Nombre").value = '';
    document.getElementById("tipo").value = '';
    document.getElementById("numerodocumento").value = '';
    document.getElementById("numero").value = '';
    document.getElementById("correo").value = '';
    document.getElementById("direccion").value = '';
    document.getElementById("edad").value = '';
    document.getElementById("fecha").value = '';
    document.getElementById("foto").value = '';
    selectedRow = null;
}