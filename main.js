let baseUrl = "https://doctor-who-episode-list.firebaseio.com";


/* Create Entry */
$("#create-submit").on("click", function(event) {
    event.preventDefault();
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
        data: entry
      };
      $.ajax(params);
});

//Accumulate to how many times an episode has been entered so there aren't duplicates
//A way to do a "like" Button on the episodes in the table.
