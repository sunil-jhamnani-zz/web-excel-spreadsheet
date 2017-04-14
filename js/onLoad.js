/**
 * Created by sunil.jhamnani on 4/14/17.
 */

(function () {
    ExcelFactory.loadTableStructure();

    var numRows = ExcelFactory.getRowCount(),
        numColumns = ExcelFactory.getColumnCount(),
        isMouseDown = false;
    for (var i=0; i<numRows; i++) {
        var row = document.querySelector("table").insertRow(-1);
        for (var j=0; j<numColumns; j++) {
            var letter = String.fromCharCode("A".charCodeAt(0)+j-1);
            row.insertCell(-1).innerHTML = i&&j ? "<input id='"+ letter+i +"'/>" : i||letter;
        }
    }

    var inputs = [].slice.call(document.querySelectorAll("input"));

    inputs.forEach(function(elm) {

        elm.onblur = function(e) {
            ExcelFactory.setter(e.target.id, e.target.value)
        };
        elm.value = ExcelFactory.getter(elm.id);


    });

    //Added to implement copy-paste
    $('table').selectable({
        filter: ":not(td)",
        selected: function(event, ui){
            console.log(event);
            console.log(ui);
            var s=$(this).find('.ui-selected');
            console.log(s);
        }
    })
})();
