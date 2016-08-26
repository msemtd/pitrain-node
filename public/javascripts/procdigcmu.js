    var localcounter = 1;
    function getAndRenderData()  {
        $.ajax({
            url: "/procdigcmu?digits=" + digits + "&localcounter=" + localcounter,
                // the URL for the request
            type: "GET",
                // whether this is a POST or GET request
            dataType: "json",
                // the type of data we expect back
            success: function (responseJson) {
                // code to run if the request succeeds; parameter = response
                var trHTML = '';
                $.each(responseJson, function (i, itemdata) {
                    trHTML += '<tr><td>' + itemdata.firstName + '</td><td>' + itemdata.lastName + '</td></tr>';
                });
                localcounter++;
                $('#results_table').append(trHTML);
            },
            error: function (xhr, status) {
                // code run if request fails; raw request and status
                console.log("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                // code to run regardless of success or failure
                console.log("The request is complete!");
            }
        })
    }
    (function($) { $(function() {
        $('#button1').click(getAndRenderData);
    });
    })(jQuery);

