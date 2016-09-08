/*
    wordchoice.js
    
    Client-side Major word choices

    requires a div and provides a method for re-evaluating the selected words

*/

function wordchoice_changed( table ) {
    
    console.log('hello: '+ table.rows('.selected').data().length + ' row(s) selected');
    // TODO take the selected rows and deal with the ordering and overlap - check mapping, etc.
}