/**
 * Created by Drei on 6/21/2016.
 */
function createTable(tableData) {
    var body = document.getElementById("mainForm");
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    table.className='pure-table pure-table-bordered';
    body.appendChild(table);
}
function  createInput(text){
    var body = document.getElementById("mainForm");
    var texto = document.createElement('input');
    texto.value=text;
    texto.readOnly=true;
    texto.className='pure-input pure-input-1';
    body.appendChild(texto);
}
var existsAlready = false;

function generarTabla(){
    // get the reference for the body
    var body = document.getElementById("mainForm");

    // creates a <table> element and a <tbody> element
    var tbl     = document.createElement("table");
    tbl.className='pure-table pure-table-bordered';
    tbl.setAttribute('id','tablaGenerada');
    /*var tblBody = document.createElement("tbody");*/

    var Filas = document.getElementById('inputFilas');
    var x = parseInt(Filas.value) + 1 ;
    var Columnas = document.getElementById('inputColumnas');
    var y = parseInt(Columnas.value) + 1 ;

    if (!existsAlready) {
        // creating all cells
        existsAlready=true;
        for (var i = 0; i < x; i++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var j = 0; j < y; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                /*var cellText = document.createTextNode(i+""+j);*/
                var input = document.createElement('input');
                input.className = 'pure-u-23-24';
                if (i == x - 1 && j == y - 1) {
                    input.readOnly = true;
                    input.type = 'hidden';
                }
                cell.appendChild(input);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            tbl.appendChild(row);
        }

        // put the <tbody> in the <table>
        /*tbl.appendChild(tblBody);*/
        // appends <table> into <body>
        body.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        /*tbl.setAttribute("border", "2");*/

        var btnResolver = document.createElement('input');
        btnResolver.value="Resolver";
        /*var btnResolverText = document.createTextNode('Resolver');
        btnResolver.appendChild(btnResolverText);*/
        btnResolver.setAttribute('id','btnResolver');
        btnResolver.setAttribute('onClick','saveTable(costos)');
        btnResolver.className = 'pure-button pure-button-primary';
        body.appendChild(btnResolver);
    }
    else{
        var mainForm = document.getElementById('mainForm');
        var existingTable = document.getElementById('tablaGenerada');
        var existingButton = document.getElementById('btnResolver');
        mainForm.removeChild(existingTable);
        mainForm.removeChild(existingButton);
        existsAlready = false;
        generarTabla();
    }

}

/*createTable(solucion);
createInput(total);*/

function saveTable(myTableArray) {

    costos.length=0;
    demanda.length=0;
    oferta.length=0;

    var table = document.getElementById('tablaGenerada');
    var Filas = document.getElementById('inputFilas');
    var x = parseInt(Filas.value);
    var Columnas = document.getElementById('inputColumnas');
    var y = parseInt(Columnas.value);
    for (var i=0;i<x ;i++) {
        var arregloFilas = [];
        for (var j=0; j< y ; j++) {
            var td = table.rows[i].cells[j].getElementsByTagName('input')[0];
            var data = parseInt(td.value);
            arregloFilas.push(data);
        }
        myTableArray.push(arregloFilas);
    }

    for (var k=0; k<y ;k++) {
        var td2 = table.rows[x].cells[k].getElementsByTagName('input')[0];
        var dataDemanda = parseInt(td2.value);
        demanda.push(dataDemanda);
    }

    for (var l=0; l<x ;l++) {
        var td3 = table.rows[l].cells[y].getElementsByTagName('input')[0];
        var dataOferta = parseInt(td3.value);
        oferta.push(dataOferta);
    }

    vam();

    /*createTable(costos);*/
    createTable(solucion);
    createInput(total);

}