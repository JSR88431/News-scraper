// Grab the articles as a json
$(document).on("click", "#scraper", function () {
    $.getJSON("/scrape", function (data) {
        console.log(data);
    });
});




$(document).on("click", "#displayer", function () {
    $.getJSON("/articles", function (data) {
        // For each one
       
        for (var i = 0; i < data.length; i++) {
            //  var newsURL = "https://www.si.com" + data[i].link;
            // Display the apropos information on the page
            $("#articles").append("<p data-id='" + data[i]._id + "' id='headline'><b>" + data[i].title + "</b></p>");
            $('#articles').append('<p>' + data[i].summary + '</p>');
            // $("#articles").append("<p><a href='https://www.si.com'></a></p>");
            $('#articles').append('<a href="https://www.si.com'+ data[i].link + '" target="blank">Read More</a>');
            $("#articles").append("<button type='button' class='btn btn-primary btn-sm ml-2' id='noter' data-id='" + data[i]._id + "'>Add Note</button>");
            
            
            
        }
    });
});


// Whenever someone clicks a p tag
$(document).on("click", "#noter", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-primary btn-sm mt-2'>Save Note</button>");
            // $("#notes").append("<button id='noteRemover' class='btn btn-danger btn-sm mt-2 ml-2'>Erase Note</button>");
            // $("#notes").append("<button data-id='" +data[0].note._id + "' id='noteRemover' class='btn btn-danger btn-sm mt-2 ml-2'>Erase Note</button>");
            

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
                $("#notes").append("<button data-id='" + data.note._id + "' id='noteRemover' class='btn btn-danger btn-sm mt-2 ml-2'>Erase Note</button>");
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});


// Deleting the note.
$(document).on("click", "#noteRemover", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");


    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");

});


// Animations

$("#articles.headline").hover(function(){
    $(this).css("color", "blue");
    }, function(){
    $(this).css("color", "black");
});

