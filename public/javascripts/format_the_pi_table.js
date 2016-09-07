/*
    format_the_pi_table.js
    Pulled in by index.pug for the client-side DataTables setup of the pi table
*/
$(document).ready(function() {
    // console.log( 'Table initialisation start: '+new Date().getTime() );
    var formatter = function (td, cellData, rowData, row, col) {
        $(td).html("<a href='/scanfull/"+cellData+"'>"+cellData+"</a>");
    };
    var coldefs = [ { title: "X" }, 
        { title: "10", "createdCell": formatter,},
        { title: "20", "createdCell": formatter,},
        { title: "30", "createdCell": formatter,},
        { title: "40", "createdCell": formatter,},
        { title: "50", "createdCell": formatter,},
    ];
    // Adding this footer doesn't help...
    // var ftr = '<tfoot><tr><th></th><th></th><th></th><th></th><th></th><th></th></tr></tfoot>'
    // $('#pi_table').append(ftr);
    $('#pi_table').DataTable( {
        data: pitab,
        ordering: false,
        pageLength: 20,
        "lengthMenu": [ [5, 10, 15, 20, -1], [5, 10, 15, 20, "All"] ],
        "language": {"lengthMenu": "Display _MENU_ rows"},
        "columns": coldefs,
        "initComplete": function(settings, json) {
            // console.log( 'Table initialisation end: '+new Date().getTime() );
        },
    } );
} );