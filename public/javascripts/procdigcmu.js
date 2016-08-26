    var localcounter = 0;
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
                var result_list = responseJson.results_tab;
                localcounter = responseJson.newindex;
                var cmucount = responseJson.cmucount;
                // calc progress
                var progress_pct = localcounter/cmucount * 100;
                var trHTML = '';
                $.each(result_list, function (i, rowdata) {
                    var dr = rowdata.map(function(d) {return '<td>' + d + '</td>';});
                    trHTML += '<tr>' + dr.join('') + '</tr>\n';
                });
                $('#results_table').append(trHTML);
                $('#statusdiv').append('<br/>\n' + responseJson.scanstatus
                    + '<br/>\n' + 'INDEX: ' + localcounter + '/' + cmucount + ' = ' + progress_pct.toFixed(2) + '%'
                    + '<br/>\n');
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

