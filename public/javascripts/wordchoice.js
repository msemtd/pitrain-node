/*
    wordchoice.js
    
    Client-side Major word choices

    requires a div and provides a method for re-evaluating the selected words

*/

function wordchoice_changed( table, choices ) {
    
    // console.log('hello: '+ table.rows('.selected').data().length + ' row(s) selected');
    var sel = table.rows('.selected').data();
    var len = sel.length;
    console.log('wordchoice_changed: '+ len + ' row(s) selected');
    
    // TODO take the selected rows and deal with the ordering and overlap - check mapping, etc.
    // jQuery-UI may be the best way to hold items for user manipulation but using choices array right now
    
    // so iterate the table rows 
    for(let i = 0; i < len; i++){
        console.log("item " + i + " of " + len + " = " + sel[i]);
        
    }
    
    
}