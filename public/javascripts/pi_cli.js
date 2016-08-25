$(function(){
    
    $('#scanbtn').click(function () {
        var whatever = $('#somedigs').value;
        var parameters = { search: whatever };
        
        $.get( '/searching', parameters, function(data) {
            $('#results').html(data);
        });
    });
});

















