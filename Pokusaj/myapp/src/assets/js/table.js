 function deleteRow(r) { 
    /* var i = r.parentNode.parentNode.rowIndex;
    console.log(i);
    document.getElementById("myTable").deleteRow(3); */
    /* var row = r.parentNode.parentNode;
    row.parentNode.removeChild(row); */
   /*  let rowid = document.getElementById("butt").closest('tr').data('index');
    document.getElementById("myTable").deleteRow(r.parentNode.parentNode.rowIndex); */
    var idx = getRowIndex( r );
    console.log(idx);
    document.getElementById("myTable").deleteRow(idx);
   
  } 

  function getRowIndex( el ) {
    while( (el = el.parentNode) && el.nodeName.toLowerCase() !== 'tr' );

    if( el ) 
        return el.rowIndex;
}

