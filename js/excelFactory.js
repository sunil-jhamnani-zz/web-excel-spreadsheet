/**
 * Created by sunil.jhamnani on 4/14/17.
 */

/**
 * Class containing all the functions related to Excel sheet.
 * @type {{getter, setter, addRow, deleteRow, addColumn, deleteColumn, loadTableStructure, getRowCount, getColumnCount, createCell}}
 */
var ExcelFactory = (function () {
    var table = document.querySelector("table");

    return {
        /**
         * Get the value of a cell
         * @param id
         * @returns {*|string}
         */
        getter: function (id) {
            return localStorage[id] || '';
        },

        /**
         * Store the value in localstorage
         * @param id
         * @param value
         */
        setter: function (id, value) {
            localStorage[id] = value;
        },

        /**
         * Add a new row
         */
        addRow: function () {
            var row = table.insertRow(-1);
            for (var j = 0; j < table.rows[0].cells.length; j++) {
                var letter = String.fromCharCode("A".charCodeAt(0) + j - 1);
                row.insertCell(-1).innerHTML =
                    localStorage["rows"] && j ? "<input id='" + letter + localStorage["rows"] + "'/>" : localStorage["rows"] || letter;
            }
            localStorage["rows"] = parseInt(localStorage["rows"]) + 1;
        },

        /**
         * Delete a row
         */
        deleteRow: function () {
            var lastRow = localStorage["rows"] - 1;
            if (lastRow) {
                table.deleteRow(lastRow)
                localStorage["rows"] = parseInt(localStorage["rows"]) - 1;
            }
            else{
                console.log("No rows to delete");
            }

        },

        addColumn: function () {
            for (i = 0; i < table.rows.length; i++) {
                this.createCell(table.rows[i].insertCell(table.rows[i].cells.length), i, table.rows[i].cells.length);
            }
        },

        deleteColumn: function () {
            var lastCol = table.rows[0].cells.length - 1,    // set the last column index
                i, j;
            // delete cells with index greater then 0 (for each row)
            if (lastCol) {
                for (i = 0; i < table.rows.length; i++) {
                    table.rows[i].deleteCell(lastCol)
                }
                localStorage["rows"] = parseInt(localStorage["rows"]) - 1;
            }
            else {
                console.log("No Columns to delete");
            }

        },

        loadTableStructure: function() {
            localStorage["rows"] = localStorage["rows"] || 5;
            localStorage["columns"] = localStorage["columns"] || 6;
        },

        getRowCount: function() {
            return localStorage["rows"];
        },

        getColumnCount: function () {
            return localStorage["columns"]
        },

        createCell: function(cell, idText, letter) {
            letter = String.fromCharCode("A".charCodeAt(0) + letter - 2);
            cell.innerHTML =
                idText ? "<input id='" + letter + idText + "'/>" : letter;
        }
    }

})();