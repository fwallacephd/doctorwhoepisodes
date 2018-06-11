$("#create-display").show();
$("#view-list").hide();
$("#edit-display").hide();

$(".underline").on("click", function(){
    $("#create-display").hide();
    $("#view-list").show();
    $("#edit-display").hide();
});

$(".back").on("click", function(){
    $("#create-display").show();
    $("#view-list").hide();
    $("#edit-display").hide();
     $("#revise-episode-input").val();
    $("#revise-writer-input").val();
    $("#select-doctor").val(1);
});

let baseUrl = "https://doctor-who-episode-list.firebaseio.com";
let currentID;

/* Create Entry */
$("#create-submit").on("click", function(event) {
    event.preventDefault();
    $("#create-display").hide();
    $("#view-list").show();
    $("#edit-display").hide();
    let entry = {
        episode: $("[name=episode-name]").val(), //Get name of episode
        writer: $("[name=writer-name]").val(), //Get name of the writer
        doctor: $("[name=doctor]").val()//Get the # of the doctor
    };

    //should I make a separate function here?

    let url = baseUrl + "/who.json"; //Firebase url
    let verb = "POST"; // Post verb to create new

    //convert to JSON?
    //create objects out of the data?
    let entryAsJson = JSON.stringify(entry);
    console.log(entryAsJson)


    //what to use as success?
    var params = {
        url: url,
        method: verb,
        data: entryAsJson,
        success: function () {
            displayEpisodeList();
        }
      };
      $.ajax(params);
});

//Accumulate to how many times an episode has been entered so there aren't duplicates
//A way to do a "like" Button on the episodes in the table.

/* List Entry */

function displayEpisodeList(){
    let url = baseUrl + "/who.json"; //Firebase URL
    let verb = "GET"; //Get verb to get the entries

    var params = {
        url: url,
        method: verb,
        //episodes objects returned from the call
        success: function getData(episodes){
            console.log(episodes)
            //item is the long ID
            $(".table-body").html("");
            for (let id in episodes){
                //do a look up
                let episode = episodes[id];
                let newTableRow = $("<tr id='" + id + "'></tr>");
                $(".table-body").append(newTableRow);
                newTableRow.append("<td class='title'>" + episode.episode + "</td>").append("<td class='writer'>" + episode.writer + "</td>").append("<td class='number'>" + episode.doctor + "</td>").append("<td class='edit'>Edit</td>");

            }
        }
    };
    $.ajax(params);
};


displayEpisodeList();

$("table").on("click", ".edit", function(){
    $("#create-display").hide();
    $("#view-list").hide();
    $("#edit-display").show();
    //display screen
    let newEpisode = $(this).closest("tr").find(".title").text();
    let newWriter = $(this).closest("tr").find(".writer").text();
    let newDoctor = $(this).closest("tr").find(".number").text();
    currentID = $(this).closest("tr").attr("id");
    console.log (newDoctor, newEpisode, newWriter);
    $("#revise-episode-input").val(newEpisode);
    $("#revise-writer-input").val(newWriter);
    $("#select-doctor").val(newDoctor);
});

$("#edit-submit").on("click", function(){

   let url = baseUrl + "/who/" + currentID + ".json";
   let verb = "PUT";

   let entry = {
        episode: $("#revise-episode-input").val(), //Get name of episode
        writer: $("#revise-writer-input").val(), //Get name of the writer
        doctor: $("#select-doctor").val()//Get the # of the doctor
    };

    let entryAsJson = JSON.stringify(entry);

    let params = {
        url: url,
        method: verb,
        data: entryAsJson,
        success: function displayList(){
            displayEpisodeList();
        }
    };
    $.ajax(params);

    $("#create-display").hide();
    $("#view-list").show();
    $("#edit-display").hide();
});


$("#delete").on("click", function(){
    let url = baseUrl + "/who/" + currentID + ".json";
   let verb = "DELETE";

   let entry = {
        episode: $("#revise-episode-input").val(), //Get name of episode
        writer: $("#revise-writer-input").val(), //Get name of the writer
        doctor: $("#select-doctor").val()//Get the # of the doctor
    };

    let entryAsJson = JSON.stringify(entry);

    let params = {
        url: url,
        method: verb,
        data: entryAsJson,
        success: function displayList(){
            displayEpisodeList();
        }
    };
    $.ajax(params);

    $("#create-display").hide();
    $("#view-list").show();
    $("#edit-display").hide();
});








