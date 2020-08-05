const API_KEY = "MbREfdD9Y4pqheqDKUJQtMnWKlAhR9ZH";
var searchTerm = "";
var queryURL = "";
var numRecords = 0;
var articlesHere = $("#articles-here");
var startYear = "";
var endYear = "";

function updateQuery() {
    searchTerm = $("#search").val();
    numRecords = $("#num-records").val();
    startYear = $("#start-year").val();
    endYear = $("#end-year").val();
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
    if (startYear.length > 0) {
        queryURL += ("begin_date=" + startYear + "0101&");
    }
    if (endYear.length > 0) {
        queryURL += ("end_date=" + endYear + "0101&");
    }
    queryURL += ("q=" + searchTerm + "&api-key=" + API_KEY);
}

function clearQuery() {
    $("#articles-here").empty();
}


$("#submit-button").on("click", function(event) {
    event.preventDefault()

    updateQuery();

    $.ajax({
        url: queryURL
    }).then(function(query) {
        clearQuery();
        for (var i = 0; i < numRecords; i++) {
            var newArticle = query.response.docs[i];

            var newHeader = $("<div>");
            newHeader.text(newArticle.headline.main);
            newHeader.css({"fontSize":"24px", "fontWeight":"bold", "marginTop":"8px", "marginBottom":"8px;"});

            articlesHere.append(newHeader);
        }
    });
});

$("#clear-button").on("click", function(event) {
    event.preventDefault();
    clearQuery();
})