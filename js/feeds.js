document.allContent = "";

function loadAllContent() {
    console.log("loading content....");
    $.getJSON('content/content.json', function(data) {
        window.allContent = data;
    });

    $('#feedData').rssfeed('http://www.minister.immi.gov.au/search/rss.cgi?query_and=O:minister-cb&query_and=A:20', {
            limit: 5,
            snippet: false,
            content: false,
            date: false,
            header:false
    });
}

$(function() {
    loadAllContent();
});

$('#core_content').load('home.html');

var currentTab='#home';

$("#home").mouseup(function() {
    setSelectedTab('#home', 'home.html');

//    var jqxhr = $.getJSON( "content/content.json", function() {
//        alert( "success" );
//    });
//    .done(function() { alert( "second success" ); })
//    .fail(function( jqxhr, textStatus, error ) {
//        var err = textStatus + ', ' + error;
//        alert( "Request Failed: " + err);
//    });

//    $.getJSON('content/content.json', function(data) {
//        var items = [];
//        alert(data);
//        $.each(data, function(key, val) {
//        alert(val);
//            items.push('<li id="' + key + '">' + val + '</li>');
//        });
//        $('<ul/>', {
//            'class': 'my-new-list',
//            html: items.join('')
//        }).appendTo('body');
//    });

});

$("#visas").mouseup(function() {
    setSelectedTab('#visas', 'visas.html');
});

//$("#essentials").mouseup(function() {
//    setSelectedTab('#essentials', 'about.html');
//});

$("#tfn").mouseup(function() {
    setSelectedTab('#tfn', 'generic.html', '#essentials');
});

$("#medicare").mouseup(function() {
    setSelectedTab('#medicare', 'generic.html', '#essentials');
});

$("#banks").mouseup(function() {
    setSelectedTab('#banks', 'generic.html', '#essentials');
});

$("#rta").mouseup(function() {
    setSelectedTab('#rta', 'generic.html', '#essentials');
});

$("#health").mouseup(function() {
    setSelectedTab('#health', 'generic.html', '#essentials');
});

$("#super").mouseup(function() {
    setSelectedTab('#super', 'generic.html', '#essentials');
});

$("#links").mouseup(function() {
    // TODO - no styleTable after refactor
    setSelectedTab('#links', 'links.html', styleTable);
});

$("#states").mouseup(function() {
    setSelectedTab('#states', 'about.html');
});

$("#books").mouseup(function() {
    setSelectedTab('#books', 'about.html');
});

$("#about").mouseup(function() {
    setSelectedTab('#about', 'generic.html');
});

function getContentForPage() {
    var pageContent;
    $.each(allContent, function(i, v) {
        if (i == contentSelect) {
            pageContent = v;
            return;
        }
    });
    return pageContent;
}

function setSelectedTab(selected, page, selectedTab) {
    var contentSelect = selected.substr(1, selected.length-1);
    console.log(contentSelect + " selected");

    if (selectedTab != null) {
        selected = selectedTab;
    }

    $(currentTab).removeClass('active');
    $(selected).addClass('active');
    currentTab = selected;
    $('#core_content').load(page, function() {
        loadPageContent(contentSelect);
    });
}

//$.getJSON('content/content.json', function(data) {
//    var items = [];
//    $.each(data, function(key, val) {
//    alert(val);
//        items.push('<li id="' + key + '">' + val + '</li>');
//    });
//    $('<ul/>', {
//        'class': 'my-new-list',
//        html: items.join('')
//    }).appendTo('body');
//});

/*$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "content.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('CONTENT').each(function() {
                $(this).find('SECTION').each(function() {
                    var title = $(this).find('NAME').text();
                    $("#title").text(title)
                });
            });
        }
   });
});
*/

$(window).load(function(){

//   $('#feedData').rssfeed('http://www.minister.immi.gov.au/search/rss.cgi?query_and=O:minister-cb&query_and=A:20', {
//        limit: 5,
//        snippet: false,
//        content: false,
//        date: false,
//        header:false
//    });


/*
    $.getJSON("https://api.twitter.com/1/statuses/user_timeline/johnwtempleton.json?callback=?", function(data) {
        html = "";
        for (i=0; i<5; i++) {
            html += "<p>";
            html += data[i].text;
            html += "</p>";
        }
        //html += "<ul>";
        $("#twitter").html(html)
    });*/
});

function loadPageContent(contentSelect) {
    var pageContent;
    $.each(allContent, function(i, v) {
        if (i == contentSelect) {
            pageContent = v;
            return;
        }
    });
    $('#pageTitle').html(pageContent.title);
    $('#pageHeadline').html(pageContent.headline);
    $('#content').html(pageContent.body);
}

function styleTable() {
    $("tr:odd").addClass('odd');
    $("tr:even").addClass('even');
}

